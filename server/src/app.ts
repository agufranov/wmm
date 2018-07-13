import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { filter, isEmpty, pick } from 'lodash'
import { connect, model, Schema } from 'mongoose'

import { getText } from './backupReader'
import { getOperations } from './rgx'

(async () => {
    const app = express()

    app.use(bodyParser.json())

    app.listen(3000)

    console.log('Listening')

    await connect('mongodb://localhost/wmm')
    console.log('MongoDB connected')

    const category = model('category', new Schema({
        name: { type: String, unique: true },
    }))

    const place = model('place', new Schema({
        name: { type: String, unique: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'category' },
    }))

    const p = new place({
        name: 'TestPlace',
        category: new category({
            name: 'food',
        }),
    })

    console.log('categories', await category.find())
    console.log('places', await place.find())

    const texts = await getText()
    const data = getOperations(texts)

    app.get('/api/get', (req: Request, res: Response) => res.json(data))

    app.get('/api/categories', async (req, res) => {
        res.json(await category.find())
    })

    app.post('/api/categories', async (req, res) => {
        try {
            res.json({
                error: undefined,
                data: await new category(req.body).save(),
            })
        } catch (e) {
            res.json({ error: e })
        }
    })

    app.get('/api/places', async (req, res) => {
        res.json(await place.find())
    })

    app.post('/api/places', async (req, res) => {
        try {
            res.json({
                error: undefined,
                data: await new place(req.body).save(),
            })
        } catch (e) {
            res.json({ error: e })
        }
    })
})()
