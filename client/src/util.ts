import moment, { unitOfTime } from 'moment'
import { Dictionary, groupBy } from 'ramda'

import { Op, OpDTO } from './typings'

// import { IOperation, IOperationExt } from './app'

export function toOperationExt(o: OpDTO): Op {
    const datetime = moment(o.datetimeStr, 'DD.MM.YY HH:mm')
    return {
        ...o,
        datetime,
        timestamp: datetime.valueOf(),
        before: o.balance - o.amount,
    }
}

export function groupOps(unit: unitOfTime.StartOf, ops: Op[]): Dictionary<Op[]> {
    return groupBy(op => op.datetime.clone().startOf(unit).valueOf().toString(), ops)
}

// export function withPrev<T>(xs: T[]): Array<[T, T | undefined]> {
//     return slice(
//         zip(xs, [undefined, ...xs]),
//         0,
//         -1,
//     ) as Array<[T, T | undefined]>
// }
