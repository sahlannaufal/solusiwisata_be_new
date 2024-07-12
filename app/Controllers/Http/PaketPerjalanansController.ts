import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaketPerjalanan from 'App/Models/PaketPerjalanan'
import Application from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class PaketPerjalanansController {
    public async index({response}: HttpContextContract) {
        const paketPerjalanan = await PaketPerjalanan.query()

        return response.json({
            data: {
                paketPerjalanan: paketPerjalanan
            }
        })
    }

    public async store({request, response}: HttpContextContract) {
        let {nama, destinasi, harga, deskripsi, waktu, foto} = request.body()

        foto = request.file('foto', {
            size: '2mb',
            extnames: ['jpg','png','jpeg']
        })

        const nameFile = `${string.generateRandom(32)}.${foto.subtype}`
        await foto.move(Application.tmpPath('foto'), {
            name:nameFile
        })

        await PaketPerjalanan.create({
            nama: nama,
            destinasi: destinasi,
            waktu: waktu,
            harga: harga,
            deskripsi: deskripsi,
            foto: `foto/${nameFile}`
        })

        return response.json({
            message: 'success input paket perjalanan'
        })
    }
}
