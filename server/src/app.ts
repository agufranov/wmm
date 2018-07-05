import express from 'express'
import { pick } from 'lodash'
import XRegExp from 'xregexp'
import { getText } from './backupReader'

(async () => {
    const app = express()

    app.listen(3000)

    console.log('Listening')

    const nomatch = XRegExp(`
    ^
    Вход|Ваш\\sкод|Ваш\\sпароль|Регистрация|Сбербанк|Код\\sпроверки|Автоперевод
    |Для\\sподтверждения|Автоплатеж|Уважаемый|На\\sВашу|Списание|В\\sсвязи|Выполнена
    `, 'x')

    const nomatch2 = XRegExp(`
    (
        ОТКАЗ\\s\\([^\\)]+\\)
        |оплата\\sМобильного\\sбанка
    )
    `, 'x')

    const sValue = `\\d+(\\.\\d+)?`
    const sCurrency = `(р|USD|GBP)`
    const sMoney = `${sValue}${sCurrency}`

    const match = XRegExp(`
        ^
        (?<card> [a-zA-Z0-9]+)
        \\s
        (?<datetime> \\d{2}\\.\\d{2}\\.\\d{2}(\\s\\d{2}:\\d{2})?)
        \\s
        (?<action> (покупка|списание|зачисление|оплата\\sуслуг|отмена\\sавторизации|выдача\\sналичных
            |отмена\\sпокупки|оплата\\sгодового\\sобслуживания\\sкарты|выдача|оплата|возврат\\sпокупки
            |зачисление\\sзарплаты))
        \\s
        (?<amount> ${sMoney})
        \\s
        (?<place>.*)
        \\s
        Баланс:\\s(?<balance>${sMoney})
        $
    `, 'x')

    const texts = await getText()
    const data = texts
        .filter((text: string) => !XRegExp.exec(text, nomatch) && !XRegExp.exec(text, nomatch2))
        .map((text: string) => pick(
            XRegExp.exec(text, match),
            ['card', 'datetime', 'action', 'amount', 'place', 'balance'],
        ))
    console.log(data)

    app.get('/api/get', (req, res) => res.json(data))
})()
