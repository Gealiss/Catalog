import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
export default class NavMenu extends React.PureComponent {
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
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/counter" }, "Counter")),
                            React.createElement(NavItem, null,
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/fetch-data" }, "Fetch data")),
                            React.createElement(NavItem, null,
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/catalog" }, "Catalog")),
                            React.createElement(NavItem, null,
                                React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/login" }, "Login"))))))));
    }
}
//# sourceMappingURL=NavMenu.js.map