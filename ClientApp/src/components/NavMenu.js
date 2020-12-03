import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';
import * as UserActionCreators from '../store/user/actions';
export class NavMenu extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false
        };
        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };
    }
    render() {
        return (React.createElement("header", null,
            React.createElement(Navbar, { className: "navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3", light: true },
                React.createElement(Container, null,
                    React.createElement(NavbarBrand, { tag: Link, to: "/" }, "Catalog"),
                    React.createElement(NavbarToggler, { onClick: this.toggle, className: "mr-2" }),
                    React.createElement(Collapse, { className: "d-sm-inline-flex flex-sm-row-reverse", isOpen: this.state.isOpen, navbar: true },
                        React.createElement("ul", { className: "navbar-nav flex-grow" },
                            React.createElement(NavItem, null,
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/" }, "Home")),
                            React.createElement(NavItem, null,
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/catalog" }, "Catalog")),
                            this.props.user == null
                                ?
                                    React.createElement(NavItem, null,
                                        React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/login" }, "Login"))
                                :
                                    React.createElement(NavItem, null,
                                        React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/", onClick: () => this.props.logoutUser() }, "Logout"))))))));
    }
}
export default connect((state) => state.user, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(NavMenu);
//# sourceMappingURL=NavMenu.js.map