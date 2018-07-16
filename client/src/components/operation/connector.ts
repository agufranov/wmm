import axios from 'axios'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import OperationComponent from '.'
import { placesFetch } from '../../redux/fetchers'
import { StateProps } from '../main'

export default connect(
    () => ({}),
    // tslint:disable-next-line:no-any
    (dispatch: ThunkDispatch<StateProps, void, any>) => ({
        post: async (data: { name: string; categoryId: string }) => {
            await axios.post('/api/places', data)
            await dispatch(placesFetch.action())
        },
    }),
)(OperationComponent)
