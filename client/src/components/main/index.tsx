import moment from 'moment'
import { Dictionary, mapObjIndexed, pipe, values } from 'ramda'

import React from 'react'

import { Op } from '../../typings'

import Operation from '../operation'

import { Card, CardContent, CardHeader } from '@material-ui/core'

import './style.less'

export interface StateProps {
    data: Op[]
    dataByDay: Dictionary<Op[]>
}

export interface DispatchProps {
    fetchAll(): Promise<void>
}

export default class MainComponent extends React.Component<StateProps & DispatchProps> {
    public async componentDidMount() {
        await this.props.fetchAll()
        console.log('Fetched', this.props.data.length)
    }

    public render() {
        return (
            <div className="main">
                {pipe(
                    mapObjIndexed(this.renderGroup),
                    values,
                )(this.props.dataByDay)}
            </div>
        )
    }

    // tslint:disable-next-line:arrow-return-shorthand
    private renderGroup = (ops: Op[], timeStartStr: string) => {
        return (
            <Card key={timeStartStr}>
                <CardHeader
                    title={moment(Number(timeStartStr)).format('DD MMM YYYY')}
                    subheader={timeStartStr}
                />
                <CardContent>
                    {ops.map((op, i) => (
                        <Operation key={i} operation={op}/>
                    ))}
                </CardContent>
            </Card>
        )
    }
}
