import { Category, OpDTO, Place } from '../typings'
import { FetchState } from './util/util'

export type PlacesState = FetchState<Place[]>

export type CategoriesState = FetchState<Category[]>

export type MainState = FetchState<OpDTO[]>

export type StoreState = Readonly<{
    main: MainState;
    places: PlacesState;
    categories: CategoriesState;
}>
