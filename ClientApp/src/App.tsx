import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from './store/index';
import './custom.css'

import Layout from './components/Layout';
//import Counter from './components/Counter';
//import FetchData from './components/FetchData';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Login from './components/Login';

import * as UserActionCreators from './store/user/actions';
import { UserState } from './store/user/types';

type AppProps = UserState & typeof UserActionCreators & React.ReactNode;

export class App extends React.PureComponent<AppProps> {
    public componentDidMount() {
        this.props.checkToken();
    }
    public render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/catalog' component={Catalog} />
                <Route path='/login' component={Login} />
            </Layout>
        );
    }
}

//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />

export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserActionCreators // Selects which action creators are merged into the component's props
)(App as any);
