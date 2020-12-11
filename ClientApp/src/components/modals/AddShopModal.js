import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseShopErrors } from 'src/store/shops/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Post } from 'src/utils/apiFetch';
export class AddShopModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            shop: {
                id: '', name: '', description: ''
            }
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createShop = this.createShop.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { shop: Object.assign(Object.assign({}, state.shop), { [name]: value }) })));
    }
    handleSubmit() {
        if (this.state.shop.name === '') {
            alert("Shop name can not be null");
            return;
        }
        let item = this.state.shop;
        this.createShop(item);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Button, { color: "success", onClick: this.toggle, block: true }, "Add"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Add shop"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "shopNameInput" }, "Shop name:"),
                    React.createElement(Input, { type: "text", name: "name", id: "shopNameInput", required: true, value: this.state.shop.name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemDescriptionInput" }, "Shop description:"),
                    React.createElement(Input, { type: "text", name: "description", id: "itemDescriptionInput", value: this.state.shop.description || '', onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Add"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    createShop(shop) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Post('api/shops', shop)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                let _shop = res.data;
                alert(`Created shop ${_shop.name}, id: ${_shop.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else {
                // Create alerts, set in state
                let alerts = parseShopErrors(res.data);
                if (alerts.length == 0) {
                    alerts.push({
                        type: AlertTypes.AlertMessageTypes.error,
                        title: "Error " + res.status,
                        message: ["Some error occured."]
                    });
                }
                this.setState(state => (Object.assign(Object.assign({}, state), { alerts: alerts })));
            }
        });
    }
}
//# sourceMappingURL=AddShopModal.js.map