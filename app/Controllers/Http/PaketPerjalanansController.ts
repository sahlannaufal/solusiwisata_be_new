import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaketPerjalanan from 'App/Models/PaketPerjalanan'
import { extname } from 'path'
import Helpers from '@ioc:Adonis/Core/Helpers';
import Application from '@ioc:Adonis/Core/Application'
import path from 'path';
import Database from '@ioc:Adonis/Lucid/Database'
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
            extname: ['jpg','png','jpeg']
        })

        const nameFile = `${string.generateRandom(32)}.${foto.subtype}`
        await foto.move(Application.tmpPath('foto'), {
            name:nameFile
        })

        const newPaketPerjalanan = await PaketPerjalanan.create({
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
