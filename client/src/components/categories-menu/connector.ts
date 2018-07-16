import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

// tslint:disable-next-line:ordered-imports
import CategoriesMenuComponent, { DispatchProps, StateProps } from '.'
import { placesFetch } from '../../redux/fetchers'
import { StoreState } from '../../redux/StoreState'

export default connect(
    (state: StoreState): StateProps => ({
        categories: state.categories.data,
    }),
    // tslint:disable-next-line:no-any
    (dispatch: ThunkDispatch<StoreState, void, any>): DispatchProps => ({
    }),
)(CategoriesMenuComponent)
