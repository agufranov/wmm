import axios from 'axios'
import { Dispatch } from 'redux'

import { FetchState, InferPayloadType } from './util'

export default function FetchCreator<
    TState extends FetchState<TPayload>,
    TPayload = InferPayloadType<TState>,
>(name: string, url: string, initialState: TState) {

    interface StartActionType { type: string, _dType: 'START', _name: string }
    interface SuccessActionType { type: string, payload: TPayload, _dType: 'SUCCESS', _name: string }

    // TODO Solve discriminated union problem

    return {
        // tslint:disable-next-line:arrow-return-shorthand
        reducer: (state: TState | undefined, action: StartActionType | SuccessActionType): TState => {
            if (state === undefined) { return initialState }
            if (action._name !== name) { return state }
            switch (action._dType) {
                // Seems that TS currently does not understand this
                // tslint:disable-next-line:no-any
                case 'START': return {...(state as any), loading: true}
                // tslint:disable-next-line:no-any
                case 'SUCCESS': return {...(state as any), loading: false, data: action.payload }
                default: return state
            }
        },

        action: () => async (dispatch: Dispatch<StartActionType | SuccessActionType>) => {
            dispatch({ type: `${name}.FETCH_START`, _dType: 'START', _name: name })
            const { data } = await axios.get(url)
            dispatch({
                type: `${name}.FETCH_SUCCESS`,
                payload: data as TPayload,
                _dType: 'SUCCESS',
                _name: name,
            })
        },
    }
}
