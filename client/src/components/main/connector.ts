import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { fetch, FetchStart, FetchSuccess } from '../../redux/actions'
import { StoreState } from '../../redux/StoreState'

import MainComponent, { DispatchProps, StateProps } from '.'
import { mainFetch, placesFetch } from '../../redux/fetchers'
import { groupOps, toOperationExt } from '../../util'

export default connect(
    (state: StoreState): StateProps => {
        const data = state.main.data.map(toOperationExt)
        // TODO reselect!
        return {
            data,
            dataByDay: groupOps('day', data),
        }
    },
    (dispatch: ThunkDispatch<StoreState, void, FetchStart | FetchSuccess>): DispatchProps => ({
        // tslint:disable-next-line:arrow-return-shorthand
        fetch: async () => {
            await dispatch(mainFetch.action())
            return dispatch(placesFetch.action())
        },
    }),

)(MainComponent)
