import { Dictionary } from 'lodash'

import { Op } from '../typings'

export default interface StoreState {
    readonly data: Op[]
    readonly dataByDay: Dictionary<Op[]>
}
