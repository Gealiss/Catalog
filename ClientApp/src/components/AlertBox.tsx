import * as React from 'react';
import { Alert } from '../store/alert/types';

interface AlertBoxProps {
    alerts: Alert[];
}

interface AlertBoxState {
    show: boolean;
}

export default class AlertBox extends React.PureComponent<AlertBoxProps, AlertBoxState> {
    render() {
        return (
            <>

            </>
        );
    }
}