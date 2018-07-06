import axios from 'axios'
import _, { chain, groupBy, LoDashStatic, sumBy, map, range, sortBy } from 'lodash'
import moment, { Moment } from 'moment'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        _: LoDashStatic
        data: IOperation[]
        moment: typeof moment
    }
}

window._ = _
window.moment = moment

interface IOperation {
    card: string
    datetimeStr: string
    operationType: string
    amount: number
    currency: string
    place: string
    balance: number
}

interface IOperationExt extends IOperation {
    datetime: Moment
}

interface IState {
    data: IOperationExt[]
}

class Main extends React.Component<{}, IState> {
    public state: IState = {
        data: [],
    }

    public async componentDidMount(): Promise<void> {
        const { data }: { data: IOperation[] } = await axios.get('/api/get')
        this.setState((s: IState) => ({
            ...s,
            data: sortBy(
                data.map(d => ({
                    ...d,
                    datetime: moment(d.datetimeStr, 'DD.MM.YY HH:mm'),
                })),
                (s) => s.datetime.valueOf(),
            )
        }))
        window.data = data
    }
    public render(): ReactNode {
        return (
            <div>
                {
                    chain(this.state.data)
                        .zip([null, ...this.state.data], range(this.state.data.length))
                        .slice(0, -1)
                        .groupBy<[IOperationExt, IOperationExt | null, number]>(([item, prevItem, i]) =>
                            item.datetime.clone().startOf('day').valueOf())
                        .map((itemsWithPrev, d) => {
                            const items = map(itemsWithPrev, '0')
                            return (<div key={d}>
                                <h3>{moment(Number(d)).format('DD.MM.YYYY')} [{sumBy(items, 'amount') / 100}]</h3>
                                <table>
                                    <tbody>
                                        {
                                            itemsWithPrev.map((
                                                [item, prevItem, i]: [IOperationExt, IOperationExt | null, number],
                                            ) => (
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{item.datetime.calendar()}</td>
                                                    <td>{item.datetimeStr}</td>
                                                    <td>{item.card}</td>
                                                    <td>{item.operationType}</td>
                                                    <td>{item.amount / 100}</td>
                                                    <td>{item.currency}</td>
                                                    <td>{item.place}</td>
                                                    <td>{item.balance / 100}</td>
                                                    <td>{(prevItem && (item.balance - item.amount !== prevItem.balance)) ? `ERR ${item.balance} ${item.amount} ${prevItem.balance} ${JSON.stringify(prevItem)}` : ''}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>)
                        })
                        .value()
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('react-root'),
)
