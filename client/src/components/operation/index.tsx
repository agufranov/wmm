import React from 'react'

import { Op } from '../../typings'

import { Avatar, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core'

import './style.less'

interface Props {
    operation: Op
}

interface State {
    menuAnchorEl?: HTMLElement
    x: number
}

export default class OperationComponent extends React.Component<Props> {
    public state: State = {
        menuAnchorEl: undefined,
        x: 2,
    }

    public render() {
        const { operation } = this.props
        return (
            <div>
                <ListItem className="operation">
                    <Avatar>{this.state.x}</Avatar>
                    <ListItemText
                        className="operation--text"
                        primary={operation.amount / 100}
                        secondary={operation.place}
                        onClick={this.openMenu}
                    />
                </ListItem>
                <Menu
                    anchorEl={this.state.menuAnchorEl}
                    open={Boolean(this.state.menuAnchorEl)}
                    onClose={this.closeMenu}
                >
                    <MenuItem>
                        Item 1
                    </MenuItem>
                    <MenuItem selected>
                        Item 2
                    </MenuItem>
                    <MenuItem>
                        Item 3
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    private openMenu = (e: React.MouseEvent) =>
        this.setState({ menuAnchorEl: e.currentTarget })

    private closeMenu = () => this.setState({ menuAnchorEl: undefined })
}
