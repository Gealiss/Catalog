import * as React from 'react';
import { Alert } from 'reactstrap';
import * as AlertTypes from '../store/alert/types';

interface AlertItemProps {
    alert: AlertTypes.Alert;
}

interface AlertItemState {
    visible: boolean;
}

export class AlertItem extends React.Component<AlertItemProps, AlertItemState> {
    constructor(props: AlertItemProps) {
        super(props);
        this.state = { visible: true };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    // Toggle visibility
    handleDismiss() {
        this.setState(state => ({ ...state, visible: !this.state.visible }));
    }

    render() {
        switch (this.props.alert.type) {
            case AlertTypes.AlertMessageTypes.success: {
                let message: string[] = this.props.alert.message as string[];
                return (
                    <Alert color="success" isOpen={this.state.visible} toggle={this.handleDismiss}>
                        <h4 className="alert-heading">{this.props.alert.title}</h4>
                        {
                            message != null
                                ?
                                message.map((str, i) => <p key={i}>{str}</p>)
                                :
                                null
                        }
                    </Alert>
                );
            }
            case AlertTypes.AlertMessageTypes.error: {
                let message: string[] = this.props.alert.message as string[];
                return (
                    <Alert color="danger">
                        <h4 className="alert-heading">{this.props.alert.title}</h4>
                        {
                            message != null
                                ?
                                message.map((str, i) => <p key={i}>{str}</p>)
                                :
                                null
                        }
                    </Alert>
                );
            }
            case AlertTypes.AlertMessageTypes.info: {
                let message: string[] = this.props.alert.message as string[];
                return (
                    <Alert color="info" isOpen={this.state.visible} toggle={this.handleDismiss}>
                        <h4 className="alert-heading">Info!</h4>
                        {
                            message != null
                                ?
                                message.map((str, i) => <p key={i}>{str}</p>)
                                :
                                null
                        }
                        <hr />
                        <p className="mb-0">
                            Test.
                        </p>
                    </Alert>
                );
            }
            default:
                return null;
        }
    }
}