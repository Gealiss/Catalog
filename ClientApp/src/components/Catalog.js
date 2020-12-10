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
            React.createElement("div", { className: "col-sm-4" }, "col-sm-4"),
            React.createElement("div", { className: "col-sm-8" },
                React.createElement("h1", { id: "tabelLabel" }, "Catalog"),
                this.props.isLoading
                    ? React.createElement(Spinner, { size: "xl", color: "primary" })
                    : this.renderItems())));
    }
    renderItems() {
        return (React.createElement("div", { className: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5" }, this.props.items.map((item) => React.createElement(ItemComponent, { item: item, key: item.id }))));
    }
}
export default connect((state) => state.items, // Selects which state properties are merged into the component's props
ItemActionCreators // Selects which action creators are merged into the component's props
)(Catalog);
//# sourceMappingURL=Catalog.js.map