import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import MainComponent from './components/main/connector'

ReactDOM.render(
    <Provider store={store}>
        <MainComponent/>
    </Provider>,
    document.getElementById('react-root'),
)
