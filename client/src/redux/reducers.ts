import { evolve } from 'ramda'

import { groupOps, toOperationExt } from '../util'
import { ActionTypes, AllActions } from './actions'
import { MainState, StoreState } from './StoreState'

const INITIAL_STATE: StoreState = {
    // TODO Duplicate default value on different levels!
    main: {
        loading: false,
        data: [],
    },
    places: {
        loading: false,
        data: [],
    },
}
