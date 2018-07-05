import { isEmpty, pick, reject, filter, chain } from 'lodash'
import XRegExp from 'xregexp'
import { rCardBalance } from './rgxData'

const exec = (r: RegExp) => (s: string) => XRegExp.exec(s, r)

export function getActions(allData: string[]) {
    const data = chain(allData)
        .map(exec(rCardBalance))
        .filter()
        .map((d: RegExpExecArray) => pick(d, ['card', 'stuff', 'balance']))
        .value()
    console.log(`${allData.length} all data, ${data.length} parseable`)
    return data
}
