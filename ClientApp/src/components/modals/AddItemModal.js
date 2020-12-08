import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseItemErrors } from 'src/store/items/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Post } from 'src/utils/apiFetch';
export class AddItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            id: '', name: '', category_name: '', description: '', img: ''
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createItem = this.createItem.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { [name]: value })));
    }
    handleSubmit() {
        let item = {
            id: this.state.id,
            name: this.state.name,
            category_name: this.state.category_name,
            description: this.state.description === '' ? undefined : this.state.description,
            img: this.state.img === '' ? undefined : this.state.img
        };
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        this.createItem(item);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Button, { color: "success", onClick: this.toggle }, "Add"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Add item"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "itemNameInput" }, "Item name:"),
                    React.createElement(Input, { type: "text", name: "name", id: "itemNameInput", required: true, value: this.state.name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemCategoryInput" }, "Item category:"),
                    React.createElement(Input, { type: "text", name: "category_name", id: "itemCategoryInput", required: true, value: this.state.category_name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemDescriptionInput" }, "Item description:"),
                    React.createElement(Input, { type: "text", name: "description", id: "itemDescriptionInput", value: this.state.description, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "itemImgInput" }, "Item image URL:"),
                    React.createElement(Input, { type: "text", name: "img", id: "itemImgInput", value: this.state.img, onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Add"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    createItem(item) {
        Post('api/items', item)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                let item = res.data;
                alert(`Created item ${item.name}, id: ${item.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else {
                // Create alerts, set in state
                let alerts = parseItemErrors(res.data);
                if (alerts.length == 0) {
                    alerts.push({
                        type: AlertTypes.AlertMessageTypes.error,
                        title: "Error " + res.status,
                        message: "Some error occured."
                    });
                }
                this.setState(state => (Object.assign(Object.assign({}, state), { alerts: alerts })));
            }
        });
    }
}
//# sourceMappingURL=AddItemModal.js.map