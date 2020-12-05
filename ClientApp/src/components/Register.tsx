import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { ApplicationState } from '../store/index';

import { RegisterModel, UserState } from '../store/user/types';
import * as UserActionCreators from '../store/user/actions';
import { Redirect } from 'react-router-dom';

type RegisterProps =
    UserState // ... state we've requested from the Redux store
    & typeof UserActionCreators // ... plus action creators we've requested

class Register extends React.PureComponent<RegisterProps, RegisterModel> {
    constructor(props: any) {
        super(props);
        this.state = { name: '', username: '', password: '', confirmPassword: '', email: '' };

        this.handleReg = this.handleReg.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public handleReg() {
        let regData: RegisterModel = this.state;
        // Undef email if nothing typed in
        if (regData.email == '') {
            regData.email = undefined;
        }
        console.log(regData);
        this.props.registerUser(regData);
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, [name]: value }));
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
                        <h2>Register:</h2>

                        
                        <Label for="nameInput">*Your Name:</Label>
                        <Input type="text" name="name" id="nameInput" required placeholder="Name"
                            value={this.state.name} onChange={e => this.handleChange(e)} />

                        <Label for="usernameInput">*Enter Your Username:</Label>
                        <Input type="text" name="username" id="usernameInput" required placeholder="Username"
                            value={this.state.username} onChange={e => this.handleChange(e)} />

                        <Label for="emailInput">Your Email:</Label>
                        <Input type="text" name="email" id="emailInput" placeholder="Email"
                            value={this.state.email || ''} onChange={e => this.handleChange(e)} />

                        <Label for="passwordInput">*Your Password:</Label>
                        <Input type="password" name="password" id="passwordInput" required placeholder="Password"
                            value={this.state.password} onChange={e => this.handleChange(e)} />

                        <Label for="passwordInput2">*Confirm Your Password:</Label>
                        <Input type="password" name="confirmPassword" id="passwordInput2" required placeholder="Confirm Password"
                            value={this.state.confirmPassword} onChange={e => this.handleChange(e)} />

                        <Button className="my-2" type="button" color="primary" onClick={this.handleReg}>Register</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.user, // Selects which state properties are merged into the component's props
    UserActionCreators // Selects which action creators are merged into the component's props
)(Register);