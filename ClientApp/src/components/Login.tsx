import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
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
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h2>Login:</h2>

                        <Label for="usernameInput">Username:</Label>
                        <Input type="text" name="username" id="usernameInput" required
                            value={this.state.username} onChange={e => this.handleChange(e)} />

                        <Label for="passwordInput">Password:</Label>
                        <Input type="password" name="password" id="passwordInput" required
                            value={this.state.password} onChange={e => this.handleChange(e)} />

                        <Button className="my-2" type="button" color="primary" onClick={this.handleLogin}>Login</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserActionCreators // Selects which action creators are merged into the component's props
)(Login);