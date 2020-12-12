import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseShopErrors } from 'src/store/shops/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';
class UpdateShopModal extends React.Component {
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
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateShop = this.updateShop.bind(this);
        this.deleteShop = this.deleteShop.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { shop: Object.assign(Object.assign({}, state.shop), { [name]: value }) })));
    }
    handleSelect(e) {
        // For select tag get shop from props by selected id
        const { value } = e.target;
        let shop = this.props.shops.find(shop => shop.id === value);
        this.setState((state) => (Object.assign(Object.assign({}, state), { shop: { id: value, name: (shop === null || shop === void 0 ? void 0 : shop.name) || '', description: (shop === null || shop === void 0 ? void 0 : shop.description) || '' } })));
    }
    handleSubmit() {
        // Check if shop id is 24 chars length
        if (this.state.shop.id.length !== 24) {
            alert("Shop id is empty or not exactly 24 chars long.");
            return;
        }
        if (this.state.shop.name.length < 3 || this.state.shop.name.length > 50) {
            alert("Shop must have a name. 3-50 chars.");
            return;
        }
        let item = this.state.shop;
        this.updateShop(item);
    }
    render() {
        if (this.props.isShopsLoading) {
            alert("Shops is still loading");
            return;
        }
        return (React.createElement("div", null,
            React.createElement(Button, { color: "warning", onClick: this.toggle, block: true }, "Update"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Update shop"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "shopIdInput" }, "Shop:"),
                    React.createElement(Input, { type: "select", name: "id", id: "shopIdInput", value: this.state.shop.id, onChange: e => this.handleSelect(e) },
                        React.createElement("option", { value: '' }, "Select shop..."),
                        ")",
                        this.props.shops.map((shop, i) => React.createElement("option", { key: i, value: shop.id }, shop.name))),
                    React.createElement(Label, { for: "shopNameInput" }, "New shop name:"),
                    React.createElement(Input, { type: "text", name: "name", id: "shopNameInput", required: true, value: this.state.shop.name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "shopDescriptionInput" }, "Item description:"),
                    React.createElement(Input, { type: "text", name: "description", id: "shopDescriptionInput", value: this.state.shop.description, onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "danger", onClick: this.deleteShop }, "Delete"),
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Update"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    deleteShop() {
        // Check if shop id is 24 chars length
        if (this.state.shop.id.length !== 24) {
            alert("Shop id must be exactly 24 chars long.");
            return;
        }
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Delete(`api/shops/${this.state.shop.id}`)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Shop was deleted ${this.state.shop.name}, id: ${this.state.shop.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
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
            else {
                // If other error response
                let alerts = [
                    {
                        type: AlertTypes.AlertMessageTypes.error,
                        title: "Error " + res.status,
                        message: ["Some error occured."]
                    }
                ];
                this.setState(state => (Object.assign(Object.assign({}, state), { alerts: alerts })));
            }
        });
    }
    updateShop(shop) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Put(`api/shops/${this.state.shop.id}`, shop)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Shop was updated ${shop.name}, id: ${shop.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
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
            else {
                // If other error response
                let alerts = [
                    {
                        type: AlertTypes.AlertMessageTypes.error,
                        title: "Error " + res.status,
                        message: ["Some error occured."]
                    }
                ];
                this.setState(state => (Object.assign(Object.assign({}, state), { alerts: alerts })));
            }
        });
    }
}
export default connect((state) => (Object.assign({}, state.shops)))(UpdateShopModal);
//# sourceMappingURL=UpdateShopModal.js.map