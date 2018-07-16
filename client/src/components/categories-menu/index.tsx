import { Menu, MenuItem } from '@material-ui/core'
import React from 'react'

import { Category } from '../../typings'

export interface StateProps {
    categories: Category[]
}

// tslint:disable-next-line:no-empty-interface
export interface DispatchProps {
}

interface OwnProps {
    anchorEl?: HTMLElement
    open: boolean
    onClose(): void
    onSelect(category: Category): void
}

export default class CategoriesMenuComponent
extends React.Component<StateProps & DispatchProps & OwnProps> {
    public render() {
        return (
            <Menu
                anchorEl={this.props.anchorEl}
                open={Boolean(this.props.anchorEl)}
                onClose={this.props.onClose}
            >
                {this.props.categories.map(category => (
                    <MenuItem
                        key={category._id}
                        onClick={() => this.props.onSelect(category)}
                    >
                        {category.name}
                    </MenuItem>
                ))}
            </Menu>
        )
    }
}
