import { chain, filter, includes, pick } from 'lodash'
import XRegExp from 'xregexp'

import { operationTypes, rCardStuffBalance, rStuff } from './rgxData'

type RawOperation = Record<'card' | 'datetime' | 'operationType' |
'baseAmount' | 'currency' | 'tax' | 'place' | 'balance' | 'input', string>

interface IOperation {
    card: string
    datetime: string
    operationType: string
    amount: number
    currency: string
    place: string
    balance: number
}

const exec = (r: RegExp) => (s: string) => XRegExp.exec(s, r)

export function getActions(allData: string[]): IOperation[] {
    const strictMatchingData = chain(allData).map(exec(rStuff)).filter().value()
    const weakMatchingData = chain(allData).map(exec(rCardStuffBalance)).filter().value()
    console.log(`${strictMatchingData.length} strict, ${weakMatchingData.length} weak`)

    return strictMatchingData
        .map(s => pick(
            s,
            [
                'card', 'datetime', 'operationType', 'baseAmount',
                'currency', 'tax', 'place', 'balance', 'input',
            ],
        ) as RawOperation)
        .map(s => {
            if (!includes(operationTypes, s.operationType)) {
                throw new Error(`Unknown operation type: [${s.operationType}] [${s.input}]`)
            }
            return s
        })
        .map<IOperation>((s) => ({
            amount: Number(s.baseAmount) + (Number(s.tax) || 0),
            balance: Number(s.balance),
            ...pick(s, [
                'card', 'datetime', 'operationType', 'currency', 'place',
            ]),
        }))
}
