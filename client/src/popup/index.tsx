import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import './style.less'

interface IProps {
    top: number
    left: number
    onClose(): void
}

const modalRoot: HTMLElement = document.getElementById('modal-root')!

export class Popup extends React.Component<IProps> {
    private el: HTMLDivElement

    public constructor(props: IProps) {
        super(props)
        this.el = document.createElement('div')
    }

    public componentDidMount() {
        modalRoot.appendChild(this.el)
    }

    public componentWillUnount() {
        modalRoot.removeChild(this.el)
    }

    public render(): ReactNode {
        return ReactDOM.createPortal(
            <div className="popup">
                <div
                    className="popup--overlay"
                    onClick={this.props.onClose}
                >
                </div>
                <div
                    className="popup--container"
                    style={{
                        top: this.props.top,
                        left: this.props.left,
                    }}
                >
                    { this.props.children }
                </div>
            </div>,
            this.el,
        )
    }
}
