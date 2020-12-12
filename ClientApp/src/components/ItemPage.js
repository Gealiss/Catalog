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
        this._isMounted = false;
        // Try to get item by provided id
        this.item = undefined;
        this.loadPrices = this.loadPrices.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.props.requestItem(this.props.match.params.itemId);
            this.loadPrices();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        // Do render after componentDidMount
        // If items or shops is still loading
        if (!this._isMounted || (this.props.isLoading || this.props.isShopsLoading)) {
            return React.createElement(React.Fragment, null,
                " Loading... ",
                React.createElement(Spinner, { size: "xl", color: "primary" }),
                " ");
        }
        if (this.props.items.length === 0) {
            return React.createElement(Redirect, { to: "/" });
        }
        this.item = this.props.items[0];
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
                            this.state.itemPrices.map((price, i) => {
                                let shop = this.props.shops.find(shop => shop.id === price.shop_id);
                                return (React.createElement(Row, { key: i },
                                    React.createElement(Col, null, (shop === null || shop === void 0 ? void 0 : shop.name) ? React.createElement("p", null, shop.name)
                                        : React.createElement("p", null, "Unknown")),
                                    React.createElement(Col, null,
                                        React.createElement("b", null, price.price)),
                                    React.createElement(Col, null, price.availability
                                        ? React.createElement(Badge, { color: "success" }, "In stock")
                                        : React.createElement(Badge, { color: "secondary" }, "Out of stock"))));
                            })
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
export default connect((state) => (Object.assign(Object.assign({}, state.items), state.shops)), ItemActionCreators)(ItemPage);
//# sourceMappingURL=ItemPage.js.map