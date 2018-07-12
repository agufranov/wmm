import { MainState, PlacesState } from './StoreState'
import FetchCreator from './util/FetchCreator'

export const mainFetch = FetchCreator<MainState>(
    'MAIN',
    '/api/get',
    {
        loading: false,
        data: [],
    },
)

export const placesFetch = FetchCreator<PlacesState>(
    'PLACES',
    '/api/places',
    {
        loading: false,
        data: [],
    },
)
