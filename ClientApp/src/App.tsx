import * as React from 'react';
import { Route } from 'react-router';

import './custom.css'

import Layout from './components/Layout';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Login from './components/Login';


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/login' component={Login} />
    </Layout>
);
