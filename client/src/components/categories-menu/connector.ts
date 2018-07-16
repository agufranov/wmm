import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

// tslint:disable-next-line:ordered-imports
import CategoriesMenu, { StateProps, DispatchProps } from '.'
import { StoreState } from '../../redux/StoreState'

export default connect(
    (state: StoreState): StateProps => ({
        categories: state.categories.data,
    }),
    // tslint:disable-next-line:no-any
    (dispatch: ThunkDispatch<StoreState, void, any>): DispatchProps => ({
    }),
)(CategoriesMenu)
