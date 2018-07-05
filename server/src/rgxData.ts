import XRegExp from 'xregexp'

export const rGarbage = XRegExp(`
    ^
    Вход|Ваш\\sкод|Ваш\\sпароль|Регистрация|Сбербанк|Код\\sпроверки|Автоперевод
    |Для\\sподтверждения|Автоплатеж|Уважаемый|На\\sВашу|Списание|В\\sсвязи|Выполнена
`, 'x')

export const sMBDatetime = `\\d{2}/\\d{2}/\\d{4}-\\d{2}/\\d{2}/\\d{4}`

export const operationTypes = ['оплата услуг', 'покупка', 'зачисление', 'списание',
'выдача наличных', 'оплата годового обслуживания карты',
'оплата', 'выдача', 'отмена покупки', 'отмена авторизации',
'отмена списания', 'возврат покупки', 'оплата Мобильного банка за',
'зачисление зарплаты']

export const sMoney = `\\d+(\\.\\d+)?`

export const sCurrency = `(р|[a-zA-Z]+)`

export const sDatetime = `\\d{2}\\.\\d{2}\\.\\d{2}(\\s\\d{2}\\:\\d{2})?`

export const rCardStuffBalance = XRegExp(`
    Баланс:\\s(?<balance> ${sMoney})р
    $
`, 'x')

export const rStuff = XRegExp(`
    ^
    (?<card> [a-zA-Z0-9]+)
    \\s
    (?<datetime> ${sDatetime})
    \\s
    (?<operationType> .*?)
    (
        \\s
        ${sMBDatetime}
    )?
    \\s
    (?<baseAmount> ${sMoney}) (?<currency> ${sCurrency})
    (
        \\s
        с\\sкомиссией\\s(?<tax>${sMoney})${sCurrency}
    )?
    (
        \\s
        (?<place> .*)
    )?
    \\s
    Баланс:\\s(?<balance> ${sMoney})р
    $
`, 'x')
