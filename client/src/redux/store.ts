import { applyMiddleware, createStore } from 'redux'
// tslint:disable-next-line:no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { AllActions } from './actions'
import { mainReducer } from './reducers'
import StoreState from './StoreState'

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
console.log(store)

export default store
