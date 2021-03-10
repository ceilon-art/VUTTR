// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Redis from '@ioc:Adonis/Addons/Redis'
import User from "App/Models/User";

export default class UsersController {

  public async store({ request, response }) {
    const { name, email, password } = request.post();

    if (!name || !email || !password) {
      response.status(400).json({ error: "Missign body param" })
      return;
    }

    const userExists = await User.findBy('email', email);

    if (userExists) {
      response.status(400).json({ error: "User already exists" })
      return;
    }

    const user = await User.create({
      name, email, password
    });

    await user.save()
    response.status(201)

    return user;
  }

  public async update({ request, response, auth }) {
    const { name, password, newPassword } = request.post();

    if (!password) {
      response.status(400).json({ error: "Missing password on request body" })
      return;
    }

    const user = await auth.getUser();

    const passwordCheck = await Hash.verify(password, user.password);

    if (!passwordCheck) {
      response.status(400).json({ error: "Invalid passwprd" })
      return;
    }

    if (name || newPassword) {
      if (name) {
        user.name = name
      }
      if (newPassword) {
        user.password = newPassword
      }

      await user.save()
      return user
    }
  }

  public async destroy({ request, response, auth }) {
    const { password } = request.post();

    if (!password) {
      response.status(400).json({ error: "Missing password on request body" })
      return;
    }

    const user = await auth.getUser();
    const passwordCheck = await Hash.verify(password, user.password)

    if (!passwordCheck) {
      response.status(400).json({ error: "Invalid password" })
    }

    Redis.keys(`tools:user=${user.id}:*`).then(function (keys) {
      let pipeline = Redis.pipeline()
      keys.forEach(function (key) {
        pipeline.unlink(key)
      })
      return pipeline.exec()
    })

    await user.delete();
  }
}
