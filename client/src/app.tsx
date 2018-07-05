import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'

interface IAction {
    action: string
    amount: string
    balance: string
    card: string
    datetime: string
    place: string
}

interface IState {
    data: IAction[]
}

class Main extends React.Component<{}, IState> {
    state: IState = {
        data: []
    }

    public async componentDidMount(): Promise<void> {
        const { data }: { data: IAction[] } = await axios.get('/api/get')
        this.setState((s) => ({...s, data}))
    }
    public render() {
        return (
            <div>
                {this.state.data.map((item) => (
                    <div>{item.datetime} {item.amount}</div>
                ))}
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('react-root'),
)
