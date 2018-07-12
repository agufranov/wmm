import { evolve } from 'ramda'

import { groupOps, toOperationExt } from '../util'
import { ActionTypes, AllActions } from './actions'
import StoreState from './StoreState'

const INITIAL_STATE: StoreState = {
    data: [],
    dataByDay: {},
}

export const mainReducer = (state: StoreState = INITIAL_STATE, action: AllActions): StoreState => {
    switch (action.type) {
        case ActionTypes.FETCH_SUCCESS:
            const data = action.payload.map(toOperationExt)
            const dataByDay = groupOps('day', data)
            return {
                ...state,
                data,
                dataByDay,
            }

        default: return state
    }
}
