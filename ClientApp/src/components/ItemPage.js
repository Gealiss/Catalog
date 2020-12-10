import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as ItemActionCreators from '../store/items/actions';
import { Get } from 'src/utils/apiFetch';
import { Badge, Col, Row, Spinner } from 'reactstrap';
class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPricesLoading: false, itemPrices: null };
        // Try to get item by provided id
        this.item = undefined;
        this.loadPrices = this.loadPrices.bind(this);
    }
    componentDidMount() {
        this.loadPrices();
    }
    render() {
        if (this.props.isLoading) {
            return React.createElement(React.Fragment, null,
                " Loading... ",
                React.createElement(Spinner, { size: "xl", color: "primary" }),
                " ");
        }
        this.item = this.props.items.find(item => item.id == this.props.match.params.itemId);
        if (!this.item) {
            return React.createElement(Redirect, { to: "/" });
        }
        let img = !this.item.img || this.item.img === ''
            ? "/roflan.png" : this.item.img;
        return (React.createElement(React.Fragment, null,
            React.createElement(Row, null,
                React.createElement(Col, null,
                    React.createElement("img", { src: img, className: "img-fluid", alt: "Item image" })),
                React.createElement(Col, null,
                    React.createElement("h2", null,
                        this.item.name,
                        " ",
                        React.createElement(Badge, { color: "info" }, this.item.category_name)),
                    React.createElement("h3", null, "Prices:"),
                    this.state.isPricesLoading ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                    this.state.itemPrices
                        ?
                            this.state.itemPrices.map((price, i) => React.createElement(Row, { key: i },
                                React.createElement(Col, null,
                                    React.createElement("p", null, price.shop)),
                                React.createElement(Col, null,
                                    React.createElement("b", null, price.price)),
                                React.createElement(Col, null, price.availability
                                    ? React.createElement(Badge, { color: "success" }, "In stock")
                                    : React.createElement(Badge, { color: "secondary" }, "Out of stock"))))
                        : React.createElement("small", null, "no info"),
                    React.createElement("hr", null),
                    React.createElement("p", null, this.item.description)))));
    }
    loadPrices() {
        this.setState((state) => (Object.assign(Object.assign({}, state), { isPricesLoading: true })));
        Get(`/api/priceHistory/prices/${this.props.match.params.itemId}`)
            .then(res => {
            this.setState((state) => (Object.assign(Object.assign({}, state), { isPricesLoading: false })));
            let itemPrices = res.data;
            if (res.isOk) {
                this.setState((state) => (Object.assign(Object.assign({}, state), { itemPrices: itemPrices })));
            }
            else {
                this.setState((state) => (Object.assign(Object.assign({}, state), { itemPrices: null })));
            }
        });
    }
}
export default connect((state) => state.items, ItemActionCreators)(ItemPage);
//# sourceMappingURL=ItemPage.js.map