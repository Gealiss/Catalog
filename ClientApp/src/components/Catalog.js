import * as React from 'react';
import { connect } from 'react-redux';
import * as ItemActionCreators from '../store/items/actions';
import * as Counter from '../store/Counter';
import * as FilterStore from '../store/Filter';
import { ItemComponent } from './Item';
import LoadCounter from './Counter';
import Filter from './Filter';
import { Spinner } from 'reactstrap';
class Catalog extends React.PureComponent {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }
    // This method is called when the component is first added to the document
    componentDidMount() {
        this._isMounted = true;
        console.log("Catalog did mount");
        this.props.resetCounter();
        this.props.resetFilter();
        this.props.requestItems();
    }
    // This method is called when the route parameters change
    componentDidUpdate() {
        //this.ensureDataFetched();
    }
    render() {
        console.log("RENDER");
        // If shops or categories is still loading
        if (this.props.isShopsLoading || this.props.isCategoriesLoading) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "d-flex justify-content-center" },
                    React.createElement(Spinner, { size: "xl", color: "primary" }))));
        }
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-sm-4" },
                React.createElement("h2", null, "Item filters"),
                React.createElement(Filter, null)),
            React.createElement("div", { className: "col-sm-8" },
                React.createElement("h2", { id: "tabelLabel" }, "Catalog"),
                !this._isMounted || this.props.isLoading
                    ? React.createElement(Spinner, { size: "xl", color: "primary" })
                    : this.renderItems(),
                React.createElement(LoadCounter, null))));
    }
    renderItems() {
        console.log("all items:", this.props.items, this.props.isLoading);
        if (this.props.items.length === 0) {
            return React.createElement("h5", null, "No items found...");
        }
        // Get first N items from items state
        let itemsToRender = this.props.items.slice(0, this.props.count);
        console.log("to render:", itemsToRender);
        return (React.createElement("div", { className: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5" }, itemsToRender.map((item) => React.createElement(ItemComponent, { item: item, key: item.id }))));
    }
}
export default connect((state) => (Object.assign(Object.assign(Object.assign(Object.assign({}, state.items), state.shops), state.categories), state.counter)), Object.assign(Object.assign(Object.assign({}, ItemActionCreators), Counter.actionCreators), FilterStore.actionCreators))(Catalog);
//# sourceMappingURL=Catalog.js.map