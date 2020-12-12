import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { parseCategoryErrors } from 'src/store/categories/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';
class UpdateCategoryModal extends React.Component {
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
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }
    toggle() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: !this.state.isOpened })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { category: Object.assign(Object.assign({}, state.category), { [name]: value }) })));
    }
    handleSelect(e) {
        // For select tag get shop from props by selected id
        const { value } = e.target;
        let category = this.props.categories.find(category => category.name === value);
        this.setState((state) => (Object.assign(Object.assign({}, state), { category: { name: value, description: (category === null || category === void 0 ? void 0 : category.description) || '' } })));
    }
    handleSubmit() {
        if (this.state.category.name.length < 3 || this.state.category.name.length > 30) {
            alert("Category must have a name. 3-30 chars.");
            return;
        }
        let category = this.state.category;
        this.updateCategory(category);
    }
    render() {
        if (this.props.isCategoriesLoading) {
            alert("Categories is still loading");
            return;
        }
        return (React.createElement("div", null,
            React.createElement(Button, { color: "warning", onClick: this.toggle, block: true }, "Update"),
            React.createElement(Modal, { isOpen: this.state.isOpened, toggle: this.toggle },
                React.createElement(ModalHeader, { toggle: this.toggle }, "Update category"),
                React.createElement(ModalBody, null,
                    this.state.alerts
                        ?
                            this.state.alerts.map((alert, i) => React.createElement(AlertItem, { alert: alert, key: i }))
                        :
                            null,
                    React.createElement(Label, { for: "categoryNameInput" }, "Category:"),
                    React.createElement(Input, { type: "select", name: "id", id: "categoryNameInput", value: this.state.category.name, onChange: e => this.handleSelect(e) },
                        React.createElement("option", { value: '' }, "Select category..."),
                        ")",
                        this.props.categories.map((category, i) => React.createElement("option", { key: i, value: category.name }, category.name))),
                    React.createElement(Label, { for: "shopDescriptionInput" }, "Category description:"),
                    React.createElement(Input, { type: "text", name: "description", id: "shopDescriptionInput", value: this.state.category.description, onChange: e => this.handleChange(e) })),
                React.createElement(ModalFooter, null,
                    this.state.isActionPending ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    React.createElement(Button, { color: "danger", onClick: this.deleteCategory }, "Delete"),
                    React.createElement(Button, { color: "primary", onClick: this.handleSubmit }, "Update"),
                    React.createElement(Button, { color: "secondary", onClick: this.toggle }, "Cancel")))));
    }
    deleteCategory() {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Delete(`api/categories/${this.state.category.name}`)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Category was deleted ${this.state.category.name}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
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
    updateCategory(category) {
        this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: true })));
        Put(`api/categories/${this.state.category.name}`, category)
            .then(res => {
            this.setState(state => (Object.assign(Object.assign({}, state), { isActionPending: false })));
            if (res.isOk) {
                alert(`Category was updated ${category.name}`);
                this.setState(state => (Object.assign(Object.assign({}, state), { isOpened: false, alerts: null })));
            }
            else if (res.status == 400) {
                // If badrequest response
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
export default connect((state) => (Object.assign({}, state.categories)))(UpdateCategoryModal);
//# sourceMappingURL=UpdateCategoryModal.js.map