import { chain } from 'lodash'
import moment from 'moment'
import R from 'ramda'

import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { StoreState } from '../../redux/StoreState'

import MainComponent, { DispatchProps, StateProps } from '.'
import { categoriesFetch, mainFetch, placesFetch } from '../../redux/fetchers'
import { groupOps, toOperationExt } from '../../util'

export default connect(
    (state: StoreState): StateProps => {
        const now = moment()
        const data = chain(state.main.data)
            .map(toOperationExt)
            .orderBy('datetime', 'desc')
            .takeWhile(d => now.diff(d.datetime.clone(), 'days') < 5)
            .value()
        // TODO reselect!
        return {
            data,
            dataByDay: groupOps('day', data),
        }
    },
    // tslint:disable-next-line:no-any
    (dispatch: ThunkDispatch<StoreState, void, any>): DispatchProps => ({
        // tslint:disable-next-line:arrow-return-shorthand
        fetchAll: async () => {
            await Promise.all([
                dispatch(mainFetch.action()),
                dispatch(placesFetch.action()),
                dispatch(categoriesFetch.action()),
            ])
        },
    }),

)(MainComponent)
