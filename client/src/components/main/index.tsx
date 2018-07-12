import moment from 'moment'
import { Dictionary, mapObjIndexed, pipe, values } from 'ramda'

import React from 'react'

import { Op } from '../../typings'

import './style.less'

export interface StateProps {
    data: Op[]
    dataByDay: Dictionary<Op[]>
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
                {pipe(
                    mapObjIndexed((ops: Op[], timeStartStr) => {
                        const timeStart = moment(Number(timeStartStr))
                        return (
                            <div key={timeStartStr}>
                                <h4>{timeStart.format('DD MMM YYYY')}</h4>
                                {ops.map(this.renderOp)}
                            </div>
                        )
                    }),
                    values,
                )(this.props.dataByDay)}
            </div>
        )
    }

    private renderOp = (op: Op, i: number) => (
        <div key={i} className="main--row">
            <div>{op.amount / 100}</div>
            <div>{op.balance / 100}</div>
            <div>{op.before / 100}</div>
        </div>
    )
}
