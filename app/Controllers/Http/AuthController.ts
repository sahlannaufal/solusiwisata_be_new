import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    async login({auth, request, response}: HttpContextContract) {
        try {
            const {email, password} = request.body()

            const token = await auth.use('api').attempt(email, password)

            return {
                token
            }
        } catch (error) {
            response.unauthorized('')
        }
    }
}
