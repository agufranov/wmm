import { MainState, PlacesState } from './StoreState'
import FetchCreator from './util/FetchCreator'

export const mainFetch = FetchCreator<MainState>(
    '/api/get',
    {
        loading: false,
        data: [],
    },
)

export const placesFetch = FetchCreator<PlacesState>(
    '/api/places',
    {
        loading: false,
        data: [],
    },
)
