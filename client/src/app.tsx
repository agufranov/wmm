import axios from 'axios'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface IAction {
    action: string
    amount: string
    balance: string
    card: string
    datetime: string
    place: string
    isEmpty: boolean
    raw: string
}

interface IState {
    data: IAction[]
}

class Main extends React.Component<{}, IState> {
    public state: IState = {
        data: [],
    }

    public async componentDidMount(): Promise<void> {
        const { data }: { data: IAction[] } = await axios.get('/api/get')
        this.setState((s: IState) => ({...s, data}))
    }
    public render(): ReactNode {
        return (
            <div>
                <table>
                    <tbody>
                        {
                            this.state.data.map((item: IAction, i: number) => (
                                <tr key={i}>
                                    <td>{item.balance}</td>
                                    <td>{item.card}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('react-root'),
)
