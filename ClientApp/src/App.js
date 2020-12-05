import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import './custom.css';
//import Layout from './components/Layout';
//import Counter from './components/Counter';
//import FetchData from './components/FetchData';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavMenu from './components/NavMenu';
import { AlertBox } from './components/AlertBox';
import * as UserActionCreators from './store/user/actions';
import { Container } from 'reactstrap';
export class App extends React.PureComponent {
    componentDidMount() {
        this.props.checkToken();
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(NavMenu, null),
            React.createElement(AlertBox, { alerts: this.props.alerts }),
            React.createElement(Container, { fluid: true },
                React.createElement(Route, { exact: true, path: '/', component: Home }),
                React.createElement(Route, { path: '/catalog', component: Catalog }),
                React.createElement(Route, { path: '/login', component: Login }),
                React.createElement(Route, { path: '/register', component: Register }))));
    }
}
//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />
export default connect((state) => state.user && state.alert, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(App);
//# sourceMappingURL=App.js.map