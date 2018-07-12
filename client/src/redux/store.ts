import axios from 'axios'
import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
// tslint:disable-next-line:no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { mainFetch, placesFetch } from './fetchers'
import { StoreState } from './StoreState'

type ReducerStoreType<TR> = TR extends Reducer<infer TStore, infer TActions> ? TStore : null
type ReducerActionsType<TR> = TR extends Reducer<infer TStore, infer TActions> ? TActions : null

// tslint:disable-next-line:no-any
const store = createStore<StoreState, any, void, void>(
    combineReducers({
        main: mainFetch.reducer,
        places: placesFetch.reducer,
    }),
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
)
console.log(store)

export default store
