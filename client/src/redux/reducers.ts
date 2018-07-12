import { evolve } from 'ramda'

import { OpDTO } from '../typings'
import { ActionTypes, AllActions } from './actions'
import StoreState from './StoreState'

const INITIAL_STATE: StoreState = {
    data: [],
}

export const mainReducer = (state: StoreState = INITIAL_STATE, action: AllActions): StoreState => {
    switch (action.type) {
        case ActionTypes.FETCH_SUCCESS: return evolve({
            data: () => action.payload as OpDTO[],
        })(state)
        default: return state
    }
}
