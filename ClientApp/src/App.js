import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import './custom.css';
import Layout from './components/Layout';
//import Counter from './components/Counter';
//import FetchData from './components/FetchData';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Login from './components/Login';
import * as UserActionCreators from './store/user/actions';
export class App extends React.PureComponent {
    componentDidMount() {
        this.props.checkToken();
    }
    render() {
        return (React.createElement(Layout, null,
            React.createElement(Route, { exact: true, path: '/', component: Home }),
            React.createElement(Route, { path: '/catalog', component: Catalog }),
            React.createElement(Route, { path: '/login', component: Login })));
    }
}
//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />
export default connect((state) => state.user, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(App);
//# sourceMappingURL=App.js.map