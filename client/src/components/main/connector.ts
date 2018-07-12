import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { fetch, FetchStart, FetchSuccess } from '../../redux/actions'
import StoreState from '../../redux/StoreState'

import MainComponent, { DispatchProps, StateProps } from '.'

export default connect(
    (state: StoreState): StateProps => ({
        data: state.data,
        dataByDay: state.dataByDay,
    }),
    (dispatch: ThunkDispatch<StoreState, void, FetchStart | FetchSuccess>): DispatchProps => ({
        fetch: () => dispatch(fetch()),
    }),

)(MainComponent)
