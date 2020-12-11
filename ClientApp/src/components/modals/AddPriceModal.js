import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parsePriceErrors } from 'src/store/prices/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Post } from 'src/utils/apiFetch';
class AddPriceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            price: {
                id: '',
                item_id: '',
                shop_id: '',
                dateTime: undefined,
                availability: false,
                price: 0.01
            }
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createPrice = this.createPrice.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value, checked } = e.target;
        // For checkbox change
        if (e.target.type === "checkbox") {
            this.setState((state) => (Object.assign(Object.assign({}, state), { price: Object.assign(Object.assign({}, state.price), { [name]: checked }) })));
            return;
        }
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { price: Object.assign(Object.assign({}, state.price), { [name]: value }) })));
    }
    handleSubmit() {
        if (this.state.price.shop_id === '') {
            alert("Please, select a shop");
            return;
        }
        let price = this.state.price;
        this.createPrice(price);
    }
    render() {
        if (this.props.isShopsLoading) {
            alert("Shops is still loading");
            return;
        }
        // Set first shop id in state as default
        return (React.createElement("div", null,
            React.createElement(Button, { color: "info", onClick: this.toggle, block: true }, "Add price"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Add price"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "itemidInput" }, "Item id:"),
                    React.createElement(Input, { type: "text", name: "item_id", id: "itemidInput", required: true, placeholder: "24 char string", value: this.state.price.item_id, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemShopInput" }, "Shop:"),
                    React.createElement(Input, { type: "select", name: "shop_id", id: "itemShopInput", value: this.state.price.shop_id, onChange: e => this.handleChange(e) },
                        React.createElement("option", { value: '' }, "Select shop..."),
                        ")",
                        this.props.shops.map((shop, i) => React.createElement("option", { key: i, value: shop.id }, shop.name))),
                    React.createElement(Label, { for: "itemPriceInput" }, "Item price:"),
                    React.createElement(Input, { type: "number", name: "price", id: "itemPriceInput", required: true, placeholder: "0.01 - 1000000000", step: 0.01, min: 0.01, max: 1000000000.00, value: this.state.price.price, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemCheckBox" }, "If available:"),
                    React.createElement("input", { id: "itemCheckBox", type: "checkbox", name: "availability", checked: this.state.price.availability, onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Add"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    createPrice(price) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Post('api/priceHistory', price)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                let _price = res.data;
                alert(`Added price ${_price.price} to item ${_price.item_id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else {
                // Create alerts, set in state
                let alerts = parsePriceErrors(res.data);
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
export default connect((state) => (Object.assign(Object.assign({}, state.items), state.shops)))(AddPriceModal);
//# sourceMappingURL=AddPriceModal.js.map