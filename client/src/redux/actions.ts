import axios from 'axios'
import { Action, Dispatch } from 'redux'

import { OpDTO } from '../typings'

export enum ActionTypes {
    FETCH_START = 'FETCH_START',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
}

export type AllActions = FetchStart | FetchSuccess

export interface FetchStart extends Action<ActionTypes.FETCH_START> {}
export interface FetchSuccess extends Action<ActionTypes.FETCH_SUCCESS> { payload: OpDTO[] }

export const fetchStart = (): FetchStart => ({ type: ActionTypes.FETCH_START })
export const fetchSuccess = (payload: OpDTO[]): FetchSuccess => ({ type: ActionTypes.FETCH_SUCCESS, payload })
export const fetch = () =>
    async (dispatch: Dispatch<FetchStart | FetchSuccess>) => {
        dispatch(fetchStart())
        const { data } = await axios.get<OpDTO[]>('/api/get')
        dispatch(fetchSuccess(data))
    }
