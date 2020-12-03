import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'reactstrap';
import { ApplicationState } from '../store/index';

import { LoginModel, UserState } from '../store/user/types';
import * as UserActionCreators from '../store/user/actions';
import { Redirect } from 'react-router-dom';

type LoginProps =
    UserState // ... state we've requested from the Redux store
    & typeof UserActionCreators // ... plus action creators we've requested

interface LoginState {
    username: string;
    password: string;
    submitted: boolean;
}

class Login extends React.PureComponent<LoginProps, LoginState> {
    constructor(props : any) {
        super(props);
        this.state = { username: '', password: '', submitted: false };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public handleLogin() {
        let loginData: LoginModel = { username: this.state.username, password: this.state.password };
        console.log(loginData);
        this.props.loginUser(loginData);
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({...state, [name]: value}));
    }

    public render() {
        // If user already logged in, redirect to home page
        if (this.props.user) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <h2>Login:</h2>
                <Input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                <Input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                <Input type="button" value="Login" onClick={this.handleLogin} />
                {this.props.user != null ? <p>Login Success</p> : null}
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserActionCreators // Selects which action creators are merged into the component's props
)(Login);