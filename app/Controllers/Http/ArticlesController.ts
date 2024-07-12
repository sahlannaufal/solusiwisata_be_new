import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class ArticlesController {
    public async index ({response}: HttpContextContract) {
        const article = await Article.query()

        return response.json({
            data: {
                article: article
            }
        })
    }

    public async store ({request, response}: HttpContextContract) {
        let {judul, konten, penulis, foto} = request.body()

        foto = request.file('foto', {
            size: '2mb',
            extnames: ['jpg', 'jpeg', 'png']
        })

        const nameFile = `${string.generateRandom(32)}.${foto.subtype}`
        await foto.move(Application.tmpPath('foto'), {
            name:nameFile
        })

        await Article.create({
            judul: judul,
            konten: konten,
            penulis: penulis,
            foto: `foto/${nameFile}`
        })

        return response.json({
            message: 'success input article'
        })
    }

    public async show({params, response}: HttpContextContract) {
        const {id} = params
        const article = await Article.query()
        .where({
            id:id
        })
        .firstOrFail()

        return response.json({
            data:{
                article: article
            }
        })
    }

    public async update({params, request, response}: HttpContextContract) {
        const {id} = params
        let {judul, konten, penulis, foto} = request.body()

        foto = request.file('foto', {
            size: '2mb',
            extnames: ['jpg','png','jpeg']
        })

        const existingArticle = await Article.query()
        .where({
            id:id
        })
        .firstOrFail()
        if(foto !== null) {
            const nameFile = `${string.generateRandom(32)}-updated.${foto.subtype}`
            await foto.move(Application.tmpPath('foto'), {
                name:nameFile
            })

            existingArticle.merge({
                judul: judul,
                konten: konten,
                penulis: penulis,
                foto: `foto/${nameFile}`
            })
        } else {
            existingArticle.merge({
                judul: judul,
                konten: konten,
                penulis: penulis
            })
        }

        await existingArticle.save();

        return response.json({
            message:'Success update data'
        })
    }

    public async destroy({params, response}:HttpContextContract) {
        const {id} = params
        const article = await Article.query()
        .where({
            id:id
        })
        .firstOrFail()

        await article.delete()

        return response.json({
            message:'success delete data'
        })
    }
}
