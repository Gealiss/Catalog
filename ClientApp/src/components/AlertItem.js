import * as React from 'react';
import { Alert } from 'reactstrap';
import * as AlertTypes from '../store/alert/types';
export class AlertItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
        this.handleDismiss = this.handleDismiss.bind(this);
    }
    // Toggle visibility
    handleDismiss() {
        this.setState(state => (Object.assign(Object.assign({}, state), { visible: !this.state.visible })));
    }
    render() {
        switch (this.props.alert.type) {
            case AlertTypes.AlertMessageTypes.success: {
                let message = this.props.alert.message;
                return (React.createElement(Alert, { color: "success", isOpen: this.state.visible, toggle: this.handleDismiss },
                    React.createElement("h4", { className: "alert-heading" }, this.props.alert.title),
                    message != null
                        ?
                            message.map((str, i) => React.createElement("p", { key: i }, str))
                        :
                            null));
            }
            case AlertTypes.AlertMessageTypes.error: {
                let message = this.props.alert.message;
                return (React.createElement(Alert, { color: "danger" },
                    React.createElement("h4", { className: "alert-heading" }, this.props.alert.title),
                    message != null
                        ?
                            message.map((str, i) => React.createElement("p", { key: i }, str))
                        :
                            null));
            }
            case AlertTypes.AlertMessageTypes.info: {
                let message = this.props.alert.message;
                return (React.createElement(Alert, { color: "info", isOpen: this.state.visible, toggle: this.handleDismiss },
                    React.createElement("h4", { className: "alert-heading" }, "Info!"),
                    message != null
                        ?
                            message.map((str, i) => React.createElement("p", { key: i }, str))
                        :
                            null,
                    React.createElement("hr", null),
                    React.createElement("p", { className: "mb-0" }, "Test.")));
            }
        }
    }
}
//# sourceMappingURL=AlertItem.js.map