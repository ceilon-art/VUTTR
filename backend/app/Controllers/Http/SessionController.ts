// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"

export default class SessionsController {

  public async store ({ request, auth }) {
    const { email, password } = request.post()

    const token = await auth.attempt(email, password)

    const user = await User.findBy('email', email)

    return { ...token, user }
  }
}
