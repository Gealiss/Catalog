import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row } from 'reactstrap';
import { AddItemModal } from './modals/AddItemModal';
import { AddCategoryModal } from './modals/AddCategoryModal';
import { AddShopModal } from './modals/AddShopModal';
import UpdateItemModal from './modals/UpdateItemModal';
import AddPriceModal from './modals/AddPriceModal';
import { UserRoles } from '../store/user/types';
class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var _a;
        // Check if user state exist and user role is admin
        if (((_a = this.props.user) === null || _a === void 0 ? void 0 : _a.role) !== UserRoles.Admin) {
            return React.createElement(Redirect, { to: "/" });
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
                            React.createElement(AddShopModal, null)))),
                React.createElement(Col, null,
                    React.createElement(Card, null,
                        React.createElement(CardBody, null,
                            React.createElement(CardTitle, { tag: "h5" }, "Category"),
                            React.createElement(CardSubtitle, { tag: "h6", className: "mb-2 text-muted" }, "Category manage."),
                            React.createElement(AddCategoryModal, null)))))));
    }
}
export default connect((state) => state.user)(AdminPanel);
//# sourceMappingURL=AdminPanel.js.map