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
    // This method is called when the component is first added to the document
    componentDidMount() {
        this.props.resetCounter();
        this.props.resetFilter();
        this.props.requestItems();
    }
    // This method is called when the route parameters change
    componentDidUpdate() {
        //this.ensureDataFetched();
    }
    render() {
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-sm-4" }, 
            // If shops and categories is already loaded
            !this.props.isShopsLoading && !this.props.isCategoriesLoading
                ?
                    React.createElement(React.Fragment, null,
                        React.createElement("h2", null, "Item filters"),
                        React.createElement(Filter, null))
                : React.createElement(Spinner, { size: "xl", color: "primary" })),
            React.createElement("div", { className: "col-sm-8" },
                React.createElement("h2", { id: "tabelLabel" }, "Catalog"),
                this.props.isLoading
                    ? React.createElement(Spinner, { size: "xl", color: "primary" })
                    : this.renderItems(),
                React.createElement(LoadCounter, null))));
    }
    renderItems() {
        return (React.createElement("div", { className: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5" }, this.props.items.map((item) => React.createElement(ItemComponent, { item: item, key: item.id }))));
    }
}
export default connect((state) => (Object.assign(Object.assign(Object.assign({}, state.items), state.shops), state.categories)), Object.assign(Object.assign(Object.assign({}, ItemActionCreators), Counter.actionCreators), FilterStore.actionCreators))(Catalog);
//# sourceMappingURL=Catalog.js.map