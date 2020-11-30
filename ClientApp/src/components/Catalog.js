import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ItemActionCreators from '../store/items/actions';
import { ItemComponent } from './Item';
class Catalog extends React.PureComponent {
    // This method is called when the component is first added to the document
    componentDidMount() {
        //this.ensureDataFetched();
        this.props.requestItems();
    }
    // This method is called when the route parameters change
    componentDidUpdate() {
        //this.ensureDataFetched();
    }
    render() {
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-sm-4" }, "col-sm-4"),
            React.createElement("div", { className: "col-sm-8" },
                React.createElement("h1", { id: "tabelLabel" }, "Catalog"),
                this.renderItems(),
                this.renderPagination())));
    }
    ensureDataFetched() {
        this.props.requestItems();
    }
    renderItems() {
        return (React.createElement("div", { className: "row row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5" }, this.props.items.map((item) => React.createElement(ItemComponent, { item: item, key: item.id }))));
    }
    renderPagination() {
        const prevStartItemIndex = (this.props.startItemIndex || 0) - 5;
        const nextStartItemIndex = (this.props.startItemIndex || 0) + 5;
        return (React.createElement("div", { className: "d-flex justify-content-between" },
            React.createElement(Link, { className: 'btn btn-outline-secondary btn-sm', to: `/fetch-data/${prevStartItemIndex}` }, "Previous"),
            this.props.isLoading && React.createElement("span", null, "Loading..."),
            React.createElement(Link, { className: 'btn btn-outline-secondary btn-sm', to: `/fetch-data/${nextStartItemIndex}` }, "Next")));
    }
}
export default connect((state) => state.items, // Selects which state properties are merged into the component's props
ItemActionCreators // Selects which action creators are merged into the component's props
)(Catalog);
//# sourceMappingURL=Catalog.js.map