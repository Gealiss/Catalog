import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';
import { UserState, UserRoles } from '../store/user/types';
import * as UserActionCreators from '../store/user/actions';

type NavMenuProps = UserState & typeof UserActionCreators;

export class NavMenu extends React.PureComponent<NavMenuProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Catalog</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Catalog</NavLink>
                                </NavItem>

                                {
                                    this.props.user?.role == UserRoles.Admin
                                        ?
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/admin">Admin Panel</NavLink>
                                        </NavItem>
                                        :
                                        null
                                }
                                
                                {this.props.user == null
                                    ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/" onClick={() => this.props.logoutUser()}>Logout</NavLink>
                                    </NavItem>
                                }
                                {
                                    this.props.isUserLoading
                                        ?
                                        <Spinner color="dark" />
                                        :
                                        null
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserActionCreators // Selects which action creators are merged into the component's props
)(NavMenu as any);