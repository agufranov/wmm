import axios from 'axios'
import { chain } from 'lodash'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { createSelector } from 'reselect'

import OperationComponent, { DispatchProps, OwnProps, StateProps } from '.'
import { placesFetch } from '../../redux/fetchers'
import { StoreState } from '../../redux/StoreState'

const placesDataSelector = (state: StoreState) => state.places.data
const placeNameSelector = (state: StoreState, props: OwnProps) => props.operation.place
const getPlace = createSelector(
    [placesDataSelector, placeNameSelector],
    (placesData, placeName) => {
        console.log('Selector')
        return chain(placesData)
            .find({ name: placeName })
            .get('categoryId')
            .value()
    },
)

export default connect(
    (state: StoreState, props: OwnProps) => ({
        place: getPlace(state, props),
    }),
    // tslint:disable-next-line:no-any
    (dispatch: ThunkDispatch<StateProps, void, any>): DispatchProps => ({
        post: async (data: { name: string; categoryId: string }) => {
            await axios.post('/api/places', data)
            await dispatch(placesFetch.action())
        },
    }),
)(OperationComponent)
