import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import MainComponent from './components/main/connector'

import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline>
            <MainComponent/>
        </CssBaseline>
    </Provider>,
    document.getElementById('react-root'),
)
