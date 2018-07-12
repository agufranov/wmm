import { Dictionary } from 'lodash'

import { Op, OpDTO } from '../typings'
import { FetchState } from './util/util'

interface Place { name: string }
export type PlacesState = FetchState<Place[]>

export type MainState = FetchState<OpDTO[]>

export interface StoreState {
    readonly main: MainState
    readonly places: PlacesState
}
