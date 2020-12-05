import * as React from 'react';
import { Alert, Col, Row } from 'reactstrap';
import * as AlertTypes from '../store/alert/types';
import { AlertItem } from './AlertItem';

interface AlertBoxProps {
    alerts: AlertTypes.Alert[] | null;
}

export class AlertBox extends React.Component<AlertBoxProps> {
    render() {
        if (this.props.alerts == null) {
            return (<></>);
        }
        return (
            <>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        {
                            this.props.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                        }
                    </Col>
                </Row>
            </>
        );
    }
}