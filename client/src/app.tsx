import axios from 'axios'
import _, { LoDashStatic } from 'lodash'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        _: LoDashStatic
        data: IOperation[]
    }
}

window._ = _

interface IOperation {
    card: string
    datetime: string
    operationType: string
    amount: number
    currency: string
    place: string
    balance: number
}

interface IState {
    data: IOperation[]
}

class Main extends React.Component<{}, IState> {
    public state: IState = {
        data: [],
    }

    public async componentDidMount(): Promise<void> {
        const { data }: { data: IOperation[] } = await axios.get('/api/get')
        this.setState((s: IState) => ({...s, data}))
        window.data = data
    }
    public render(): ReactNode {
        return (
            <div>
                <table>
                    <tbody>
                        {
                            this.state.data.map((item: IOperation, i: number) => (
                                <tr key={i}>
                                    <td>{item.datetime}</td>
                                    <td>{item.card}</td>
                                    <td>{item.operationType}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.currency}</td>
                                    <td>{item.place}</td>
                                    <td>{item.balance}</td>
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
