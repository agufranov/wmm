import { chain, filter, includes, pick } from 'lodash'
import XRegExp from 'xregexp'

import { allOperationTypes, inOperationTypes, outOperationTypes, rCardStuffBalance, rStuff } from './rgxData'

type RawOperation = Record<'card' | 'datetimeStr' | 'operationType' |
'baseAmount' | 'currency' | 'tax' | 'place' | 'balance' | 'input', string>

interface IOperation {
    card: string
    datetimeStr: string
    operationType: string
    amount: number
    currency: string
    place: string
    balance: number
}

const exec = (r: RegExp) => (s: string) => XRegExp.exec(s, r)

export function getOperations(allData: string[]): IOperation[] {
    const strictMatchingData = chain(allData).map(exec(rStuff)).filter().value()
    const weakMatchingData = chain(allData).map(exec(rCardStuffBalance)).filter().value()
    console.log(`${strictMatchingData.length} strict, ${weakMatchingData.length} weak`)

    return strictMatchingData
        .map(s => pick(
            s,
            [
                'card', 'datetimeStr', 'operationType', 'baseAmount',
                'currency', 'tax', 'place', 'balance', 'input',
            ],
        ) as RawOperation)
        .map<IOperation>((s) => {
            const absAmount = Math.round(Number(s.baseAmount) * 100) + Math.round(Number(s.tax) * 100 || 0)
            if (isNaN(absAmount)) { throw new Error('Amount is NaN') }
            let amount: number
            if (includes(outOperationTypes, s.operationType)) {
                amount = - absAmount
            } else if (includes(inOperationTypes, s.operationType)) {
                amount = absAmount
            } else {
                throw new Error(`Unknown operation type: [${s.operationType}] [${s.input}]`)
            }
            return {
                amount,
                balance: Math.round(Number(s.balance) * 100),
                ...pick(s, [
                    'card', 'datetimeStr', 'operationType', 'currency', 'place',
                ]),
            }
        })
}
