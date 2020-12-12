import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import { AddItemModal } from './modals/AddItemModal';
import { AddCategoryModal } from './modals/AddCategoryModal';
import { AddShopModal } from './modals/AddShopModal';
import UpdateItemModal from './modals/UpdateItemModal';
import UpdateShopModal from './modals/UpdateShopModal';
import UpdateCategoryModal from './modals/UpdateCategoryModal';
import AddPriceModal from './modals/AddPriceModal';
import * as ItemActionCreators from '../store/items/actions';
import { UserRoles } from '../store/user/types';
class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // Load all items to state and props
        this.props.requestItems();
    }
    render() {
        var _a;
        // Check if user state exist and user role is admin
        if (((_a = this.props.user) === null || _a === void 0 ? void 0 : _a.role) !== UserRoles.Admin) {
            return React.createElement(Redirect, { to: "/" });
        }
        // If items, shops or categories is still loading
        if (this.props.isLoading || this.props.isShopsLoading || this.props.isCategoriesLoading) {
            return React.createElement(React.Fragment, null,
                " Loading data... ",
                React.createElement(Spinner, { size: "xl", color: "primary" }),
                " ");
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Admin panel"),
            React.createElement(Row, { className: "row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5" },
                React.createElement(Col, null,
                    React.createElement(Card, null,
                        React.createElement(CardBody, null,
                            React.createElement(CardTitle, { tag: "h5" }, "Items"),
                            React.createElement(CardSubtitle, { tag: "h6", className: "mb-2 text-muted" }, "Items manage."),
                            React.createElement(AddItemModal, null),
                            React.createElement(UpdateItemModal, null),
                            React.createElement(AddPriceModal, null)))),
                React.createElement(Col, null,
                    React.createElement(Card, null,
                        React.createElement(CardBody, null,
                            React.createElement(CardTitle, { tag: "h5" }, "Shops"),
                            React.createElement(CardSubtitle, { tag: "h6", className: "mb-2 text-muted" }, "Shops manage."),
                            React.createElement(AddShopModal, null),
                            React.createElement(UpdateShopModal, null)))),
                React.createElement(Col, null,
                    React.createElement(Card, null,
                        React.createElement(CardBody, null,
                            React.createElement(CardTitle, { tag: "h5" }, "Category"),
                            React.createElement(CardSubtitle, { tag: "h6", className: "mb-2 text-muted" }, "Category manage."),
                            React.createElement(AddCategoryModal, null),
                            React.createElement(UpdateCategoryModal, null)))))));
    }
}
export default connect((state) => (Object.assign(Object.assign(Object.assign(Object.assign({}, state.user), state.items), state.shops), state.categories)), ItemActionCreators)(AdminPanel);
//# sourceMappingURL=AdminPanel.js.map