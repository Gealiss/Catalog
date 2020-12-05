import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { AlertItem } from './AlertItem';
export class AlertBox extends React.Component {
    render() {
        if (this.props.alerts == null) {
            return (React.createElement(React.Fragment, null));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Row, null,
                React.createElement(Col, { sm: "12", md: { size: 6, offset: 3 } }, this.props.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))))));
    }
}
//# sourceMappingURL=AlertBox.js.map