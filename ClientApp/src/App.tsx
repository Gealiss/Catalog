import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import './custom.css'

import Catalog from './components/Catalog';
import Login from './components/Login';
import Register from './components/Register';
import NavMenu from './components/NavMenu';
import { AlertBox } from './components/AlertBox';
import AdminPanel from './components/AdminPanel';
import ItemPage from './components/ItemPage';

import * as UserActionCreators from './store/user/actions';
import * as ItemActionCreators from './store/items/actions';
import { UserState } from './store/user/types';
import { ApplicationState } from './store/index';
import { AlertState } from './store/alert/types';

interface AppProps {
    userState: UserState;
    alertState: AlertState;
    userActions: typeof UserActionCreators;
    itemActions: typeof ItemActionCreators;
}

class App extends React.PureComponent<AppProps & React.ReactNode> {
    public componentWillMount() {
        this.props.itemActions.requestItems();
    }
    public componentDidMount() {
        this.props.userActions.checkToken();
    }
    public render() {
        return (
            <>
                <NavMenu />
                <AlertBox alerts={this.props.alertState.alerts} />
                <Container fluid>
                    <Route exact path='/' component={Catalog} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/admin' component={AdminPanel} />
                    <Route path='/item/:itemId' component={ItemPage} />

                </Container>
            </>
        );
    }
}

//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />

const mapStateToProps = function (state: ApplicationState) {
    return {
        userState: state.user,
        alertState: state.alert
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        userActions: bindActionCreators(UserActionCreators, dispatch),
        itemActions: bindActionCreators(ItemActionCreators, dispatch)
    }
}

export default connect(
    mapStateToProps, // Selects which state properties are merged into the component's props
    mapDispatchToProps // Selects which action creators are merged into the component's props
)(App as any);
