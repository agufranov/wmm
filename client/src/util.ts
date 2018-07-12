import { slice, zip } from 'lodash'
import moment, { Moment } from 'moment'

// import { IOperation, IOperationExt } from './app'

// export function toOperationExt(o: IOperation): IOperationExt {
//     const datetime = moment(o.datetimeStr, 'DD.MM.YY HH:mm')
//     return {
//         ...o,
//         datetime,
//         timestamp: datetime.valueOf(),
//         expectedBalanceBefore: o.balance - o.amount,
//     }

// }

// export function withPrev<T>(xs: T[]): Array<[T, T | undefined]> {
//     return slice(
//         zip(xs, [undefined, ...xs]),
//         0,
//         -1,
//     ) as Array<[T, T | undefined]>
// }
