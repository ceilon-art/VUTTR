import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"

export default class SessionsController {

  public async store ({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()

    await auth.attempt(email, password);
        
    const user = await User.findBy('email', email)

    return { user }
  }
}
