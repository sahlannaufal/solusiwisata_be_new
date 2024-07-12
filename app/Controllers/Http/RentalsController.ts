import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rental from 'App/Models/Rental'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class RentalsController {
    public async index ({response}: HttpContextContract) {
        const rental = await Rental.query()

        return response.json({
            data: {
                rental: rental
            }
        })
    }

    public async store ({request, response}: HttpContextContract) {
        let {merk, jenis,harga,seat, fitur, foto} = request.body()

        foto = request.file('foto', {
            size: '2mb',
            extnames: ['jpg','png','jpeg']
        })

        const nameFile = `${string.generateRandom(32)}.${foto.subtype}`
        await foto.move(Application.tmpPath('foto'), {
            name: nameFile
        })

        await Rental.create({
            merk: merk,
            jenis: jenis,
            harga: harga,
            seat: seat,
            fitur: fitur,
            foto: `foto/${nameFile}`
        })

        return response.json({
            message: 'success input rental'
        })
    }
}
