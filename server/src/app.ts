import express, { Request, Response } from 'express'
import { filter, isEmpty, pick } from 'lodash'

import { getText } from './backupReader'
import { getActions } from './rgx'

(async () => {
    const app = express()

    app.listen(3000)

    console.log('Listening')

    const texts = await getText()
    const data: any = getActions(texts)
    console.log(texts.length, data)

    app.get('/api/get', (req: Request, res: Response) => res.json(data))
})()
