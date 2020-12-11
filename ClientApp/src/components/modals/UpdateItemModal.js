import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, InputGroup, InputGroupAddon } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseItemErrors } from 'src/store/items/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';
class UpdateItemModal extends React.Component {
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
        this.updateItem = this.updateItem.bind(this);
        this.loadItem = this.loadItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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
        // Check if item id is 24 chars length
        if (this.state.id.length != 24) {
            alert("Item id must be exactly 24 chars long.");
            return;
        }
        let item = {
            id: this.state.id,
            name: this.state.name,
            category_name: this.state.category_name,
            description: this.state.description === '' ? undefined : this.state.description,
            img: this.state.img === '' ? undefined : this.state.img
        };
        this.updateItem(item);
    }
    loadItem() {
        // If items is still loading or loaded, but empty
        if (this.props.isLoading || this.props.items.length == 0) {
            alert("No items, or still loading.");
            return;
        }
        // Search item in global state by id from state
        let item = this.props.items.find(item => item.id == this.state.id);
        if (!item) {
            alert("No item was found.");
            return;
        }
        // Set found item to state
        this.setState(state => (Object.assign(Object.assign({}, state), { name: (item === null || item === void 0 ? void 0 : item.name) ? item.name : '', category_name: (item === null || item === void 0 ? void 0 : item.category_name) ? item.category_name : '', description: (item === null || item === void 0 ? void 0 : item.description) ? item.description : '', img: (item === null || item === void 0 ? void 0 : item.img) ? item.img : '' })));
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Button, { color: "warning", onClick: this.toggle, block: true }, "Update"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Update item"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(InputGroup, null,
                        React.createElement(Input, { type: "text", name: "id", id: "itemIdInput", required: true, placeholder: "24 char string", value: this.state.id, onChange: e => this.handleChange(e) }),
                        React.createElement(InputGroupAddon, { addonType: "prepend" },
                            React.createElement(Button, { onClick: this.loadItem }, "Find by id"))),
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
                    React.createElement(Button, { color: "danger", onClick: this.deleteItem }, "Delete"),
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Update"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    deleteItem() {
        // Check if item id is 24 chars length
        if (this.state.id.length != 24) {
            alert("Item id must be exactly 24 chars long.");
            return;
        }
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Delete(`api/items/${this.state.id}`)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Item was deleted ${this.state.name}, id: ${this.state.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
                let alerts = parseItemErrors(res.data);
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
    updateItem(item) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Put(`api/items/${this.state.id}`, item)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Item was updated ${item.name}, id: ${item.id}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
                let alerts = parseItemErrors(res.data);
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
export default connect((state) => state.items)(UpdateItemModal);
//# sourceMappingURL=UpdateItemModal.js.map