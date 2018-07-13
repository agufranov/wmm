import { Dictionary } from 'lodash'

import { Op, OpDTO } from '../typings'
import { FetchState } from './util/util'

interface Place { name: string }

export type PlacesState = FetchState<Place[]>

interface Category { name: string }

export type CategoriesState = FetchState<Category[]>

export type MainState = FetchState<OpDTO[]>

export type StoreState = Readonly<{
    main: MainState;
    places: PlacesState;
    categories: CategoriesState;
}>
