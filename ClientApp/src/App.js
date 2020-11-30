import * as React from 'react';
import { Route } from 'react-router';
import './custom.css';
import Layout from './components/Layout';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Login from './components/Login';
export default () => (React.createElement(Layout, null,
    React.createElement(Route, { exact: true, path: '/', component: Home }),
    React.createElement(Route, { path: '/counter', component: Counter }),
    React.createElement(Route, { path: '/fetch-data/:startDateIndex?', component: FetchData }),
    React.createElement(Route, { path: '/catalog', component: Catalog }),
    React.createElement(Route, { path: '/login', component: Login })));
//# sourceMappingURL=App.js.map