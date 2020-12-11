import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseCategoryErrors } from 'src/store/categories/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Post } from 'src/utils/apiFetch';
export class AddCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            category: {
                name: '', description: ''
            }
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { category: Object.assign(Object.assign({}, state.category), { [name]: value }) })));
    }
    handleSubmit() {
        if (this.state.category.name === '') {
            alert("Category name can not be null");
            return;
        }
        let item = this.state.category;
        this.createCategory(item);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Button, { color: "success", onClick: this.toggle, block: true }, "Add"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Add category"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "categoryNameInput" }, "Category name(id):"),
                    React.createElement(Input, { type: "text", name: "name", id: "categoryNameInput", required: true, value: this.state.category.name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "categoryDescrInput" }, "Category description:"),
                    React.createElement(Input, { type: "text", name: "description", id: "categoryDescrInput", value: this.state.category.description || '', onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Add"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    createCategory(category) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Post('api/categories', category)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                let _category = res.data;
                alert(`Created category ${_category.name}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else {
                // Create alerts, set in state
                let alerts = parseCategoryErrors(res.data);
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
//# sourceMappingURL=AddCategoryModal.js.map