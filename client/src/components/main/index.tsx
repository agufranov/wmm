import React from 'react'
import { OpDTO } from '../../typings'

import './style.less'

export interface StateProps {
    data: OpDTO[]
}

export interface DispatchProps {
    fetch(): Promise<void>
}

export default class MainComponent extends React.Component<StateProps & DispatchProps> {
    public async componentDidMount() {
        await this.props.fetch()
        console.log('Fetched', this.props.data.length)
    }

    public render() {
        return (
            <div className="main">
                {this.props.data.map((op, i) => (
                    <div key={i} className="main--row">
                        <div>{op.amount / 100}</div>
                        <div>{op.balance / 100}</div>
                    </div>
                ))}
            </div>
        )
    }
}
