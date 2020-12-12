import * as React from 'react';
import { connect } from 'react-redux';
import * as ItemActionCreators from '../store/items/actions';
import * as Counter from '../store/Counter';
import * as FilterStore from '../store/Filter';
import { Button, ButtonGroup, Card, CardBody, Input, Label, UncontrolledCollapse } from 'reactstrap';
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            categoriesId: [],
            shopsId: [],
            priceAsc: false,
            priceDesc: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.resetRadioClick = this.resetRadioClick.bind(this);
        this.setRadioClick1 = this.setRadioClick1.bind(this);
        this.setRadioClick2 = this.setRadioClick2.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit() {
        var _a, _b;
        this.props.resetCounter();
        // If filter is not set up
        if (this.state.name === '' && ((_a = this.state.categoriesId) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
            ((_b = this.state.shopsId) === null || _b === void 0 ? void 0 : _b.length) === 0 &&
            this.state.priceAsc === false && this.state.priceDesc === false) {
            this.props.setFilter({});
        }
        else {
            this.props.setFilter(this.state);
        }
        this.props.requestItems();
    }
    // Handle radio clicks (order by price)
    resetRadioClick() {
        this.setState((state) => (Object.assign(Object.assign({}, state), { priceAsc: false, priceDesc: false })));
    }
    setRadioClick1() {
        this.setState((state) => (Object.assign(Object.assign({}, state), { priceAsc: true, priceDesc: false })));
    }
    setRadioClick2() {
        this.setState((state) => (Object.assign(Object.assign({}, state), { priceAsc: false, priceDesc: true })));
    }
    handleCheckBox(e) {
        const { name, value } = e.currentTarget;
        let arr = this.state[name];
        // If elem was unchecked - delete its value from array
        if (!e.currentTarget.checked) {
            arr = arr.filter(e => e !== value);
            this.setState((state) => (Object.assign(Object.assign({}, state), { [name]: arr })));
            return;
        }
        arr.push(value);
        this.setState((state) => (Object.assign(Object.assign({}, state), { [name]: arr })));
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { [name]: value })));
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h5", null, "Search by name:"),
            React.createElement(Input, { type: "text", name: "name", id: "itemNameInput", value: this.state.name || '', onChange: e => this.handleChange(e) }),
            React.createElement("h5", null, "Sort by category:"),
            React.createElement(Button, { outline: true, block: true, color: "secondary", id: "togglerCategories" }, "Categories"),
            React.createElement(UncontrolledCollapse, { toggler: "#togglerCategories" },
                React.createElement(Card, null,
                    React.createElement(CardBody, null, this.props.categories.map((category, i) => React.createElement("p", { style: { marginLeft: '1rem' }, key: i },
                        React.createElement(Label, { check: true },
                            React.createElement(Input, { value: category.name, type: "checkbox", name: "categoriesId", onChange: e => this.handleCheckBox(e) }),
                            ' ',
                            category.name)))))),
            React.createElement(Button, { outline: true, block: true, color: "secondary", id: "togglerShops" }, "Shops"),
            React.createElement(UncontrolledCollapse, { toggler: "#togglerShops" },
                React.createElement(Card, null,
                    React.createElement(CardBody, null, this.props.shops.map((shop, i) => React.createElement("p", { style: { marginLeft: '1rem' }, key: i },
                        React.createElement(Label, { check: true },
                            React.createElement(Input, { value: shop.id, type: "checkbox", name: "shopsId", onChange: e => this.handleCheckBox(e) }),
                            ' ',
                            shop.name)))))),
            React.createElement("h5", null, "Sort by price:"),
            React.createElement(ButtonGroup, null,
                React.createElement(Button, { outline: true, color: "primary", onClick: this.resetRadioClick }, "None"),
                React.createElement(Button, { outline: true, color: "primary", onClick: this.setRadioClick1 }, "Ascending"),
                React.createElement(Button, { outline: true, color: "primary", onClick: this.setRadioClick2 }, "Descending")),
            React.createElement("br", null),
            React.createElement(Button, { onClick: this.handleSubmit, className: "my-2" }, "Search"),
            React.createElement("hr", null)));
    }
}
export default connect((state) => (Object.assign(Object.assign(Object.assign({}, state.shops), state.categories), state.items)), Object.assign(Object.assign(Object.assign({}, ItemActionCreators), Counter.actionCreators), FilterStore.actionCreators))(Filter);
//# sourceMappingURL=Filter.js.map