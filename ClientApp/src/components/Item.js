import * as React from 'react';
import { Get } from 'src/utils/apiFetch';
import { Badge, Col, Row, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
export class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPriceLoading: false, itemPrice: null };
        this._isMounted = false;
        this.loadPrice = this.loadPrice.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.loadPrice();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        var _a, _b;
        let img = this.props.item.img == null || this.props.item.img === ''
            ? "/roflan.png" : this.props.item.img;
        // TODO: if all item prices are null
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col mb-3" },
                React.createElement("div", { className: "card h-100", id: this.props.item.id },
                    React.createElement("img", { src: img, className: "card-img-top", alt: "..." }),
                    React.createElement("div", { className: "card-body" },
                        React.createElement(Link, { to: `item/${this.props.item.id}` },
                            React.createElement("h5", { className: "card-title" }, this.props.item.name)),
                        ((_a = this.state.itemPrice) === null || _a === void 0 ? void 0 : _a.availability) ? React.createElement(Badge, { color: "success" }, "In stock")
                            : React.createElement(Badge, { color: "secondary" }, "Out of stock"),
                        React.createElement("p", { className: "card-text" }, this.props.item.description)),
                    React.createElement("div", { className: "card-footer" },
                        React.createElement(Row, null,
                            React.createElement(Col, null,
                                React.createElement("small", null, "Price from:")),
                            React.createElement(Col, null,
                                this.state.isPriceLoading
                                    ? React.createElement(Spinner, { size: "sm", color: "primary" }) : null,
                                ((_b = this.state.itemPrice) === null || _b === void 0 ? void 0 : _b.price) ?
                                    React.createElement("b", null, this.state.itemPrice.price)
                                    :
                                        React.createElement("small", null, "no info"))))))));
    }
    loadPrice() {
        this._isMounted && this.setState((state) => (Object.assign(Object.assign({}, state), { isPriceLoading: true })));
        Get(`/api/priceHistory/minPrice/${this.props.item.id}`)
            .then(res => {
            this._isMounted && this.setState((state) => (Object.assign(Object.assign({}, state), { isPriceLoading: false })));
            let itemPrice = res.data;
            if (res.isOk) {
                this._isMounted && this.setState((state) => (Object.assign(Object.assign({}, state), { itemPrice: itemPrice })));
            }
            else {
                this._isMounted && this.setState((state) => (Object.assign(Object.assign({}, state), { itemPrice: null })));
            }
        });
    }
}
//# sourceMappingURL=Item.js.map