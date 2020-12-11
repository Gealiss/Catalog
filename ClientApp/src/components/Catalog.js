import * as React from 'react';
import { connect } from 'react-redux';
import * as ItemActionCreators from '../store/items/actions';
import { ItemComponent } from './Item';
import { Spinner } from 'reactstrap';
class Catalog extends React.PureComponent {
    // This method is called when the component is first added to the document
    componentDidMount() {
        //this.props.requestItems();
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
                ? React.createElement("h2", null, "Item filters")
                : React.createElement(Spinner, { size: "xl", color: "primary" })),
            React.createElement("div", { className: "col-sm-8" },
                React.createElement("h2", { id: "tabelLabel" }, "Catalog"),
                this.props.isLoading
                    ? React.createElement(Spinner, { size: "xl", color: "primary" })
                    : this.renderItems())));
    }
    renderItems() {
        return (React.createElement("div", { className: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5" }, this.props.items.map((item) => React.createElement(ItemComponent, { item: item, key: item.id }))));
    }
}
export default connect((state) => (Object.assign(Object.assign(Object.assign({}, state.items), state.shops), state.categories)), // Selects which state properties are merged into the component's props
ItemActionCreators // Selects which action creators are merged into the component's props
)(Catalog);
//# sourceMappingURL=Catalog.js.map