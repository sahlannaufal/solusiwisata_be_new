import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    async login({auth, request, response}: HttpContextContract) {
        // try {
        //     const {email, password} = request.body()

        //     const token = await auth.use('api').attempt(email, password)

        //     return {
        //         token
        //     }
        // } catch (error) {
        //     response.unauthorized('')
        // }


        const { email, password } = request.only(['email', 'password'])

        // Mencari user berdasarkan email
        const user = await User.findBy('email', email)
        if (!user) {
            return response.status(422).json({
                message: 'Email tidak terdaftar!'
            })
        }

        // Memeriksa kecocokan password
        const isPasswordValid = await Hash.verify(user.password, password)
        if (!isPasswordValid) {
            return response.status(422).json({
                message: 'Password salah!'
            })
        }

        // Membuat token API
        const token = await auth.use('api').generate(user)

        // Mengembalikan respons
        return response.json({
            data: {
                user,
                token
            }
        })
    }
}
