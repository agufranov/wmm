import XRegExp from 'xregexp'

export const rGarbage = XRegExp(`
    ^
    Вход|Ваш\\sкод|Ваш\\sпароль|Регистрация|Сбербанк|Код\\sпроверки|Автоперевод
    |Для\\sподтверждения|Автоплатеж|Уважаемый|На\\sВашу|Списание|В\\sсвязи|Выполнена
    `, 'x')

export const sMoney = `\\d+(\\.\\d+)?`

export const rCardBalance = XRegExp(`
    ^
    (?<card> VISA\\d+)
    \\s
    (?<stuff> .*)
    \\s
    (?<balance> Баланс:\\s${sMoney}р)
    $
    `, 'x')
