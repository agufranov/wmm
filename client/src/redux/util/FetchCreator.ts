import axios from 'axios'
import { Dispatch } from 'redux'

import { FetchState, InferPayloadType } from './util'

export default function FetchCreator<
    TState extends FetchState<TPayload>,
    TPayload = InferPayloadType<TState>,
>(url: string, initialState: TState) {
    const startActionKind = 'C_START'
    const successActionKind = 'C_SUCCESS'

    interface StartActionType { type: typeof startActionKind }
    interface SuccessActionType { type: typeof successActionKind, payload: TPayload }

    return {
        // tslint:disable-next-line:arrow-return-shorthand
        reducer: (state: TState | undefined, action: StartActionType | SuccessActionType): TState => {
            if (state === undefined) { return initialState }
            switch (action.type) {
                // Seems that TS currently does not understand this
                // tslint:disable-next-line:no-any
                case startActionKind: return {...(state as any), loading: true}
                // tslint:disable-next-line:no-any
                case successActionKind: return {...(state as any), loading: false, data: action.payload }
                default: return state
            }
        },

        action: () => async (dispatch: Dispatch<StartActionType | SuccessActionType>) => {
            dispatch({ type: startActionKind })
            const { data } = await axios.get(url)
            dispatch({
                type: successActionKind,
                payload: data as TPayload,
            })
        },
    }
}
