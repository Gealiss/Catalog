import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import * as UserActionCreators from '../store/user/actions';
import { Redirect } from 'react-router-dom';
class Register extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { name: '', username: '', password: '', confirmPassword: '', email: '' };
        this.handleReg = this.handleReg.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleReg() {
        let regData = this.state;
        // Undef email if nothing typed in
        if (regData.email == '') {
            regData.email = undefined;
        }
        this.props.registerUser(regData);
    }
    handleChange(e) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => (Object.assign(Object.assign({}, state), { [name]: value })));
    }
    render() {
        // If user already logged in, redirect to home page
        if (this.props.user) {
            return React.createElement(Redirect, { to: "/" });
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Row, null,
                React.createElement(Col, { sm: "12", md: { size: 6, offset: 3 } },
                    React.createElement("h2", null, "Register:"),
                    React.createElement(Label, { for: "nameInput" }, "*Your Name:"),
                    React.createElement(Input, { type: "text", name: "name", id: "nameInput", required: true, placeholder: "Name", value: this.state.name, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "usernameInput" }, "*Enter Your Username:"),
                    React.createElement(Input, { type: "text", name: "username", id: "usernameInput", required: true, placeholder: "Username", value: this.state.username, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "emailInput" }, "Your Email:"),
                    React.createElement(Input, { type: "text", name: "email", id: "emailInput", placeholder: "Email", value: this.state.email || '', onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "passwordInput" }, "*Your Password:"),
                    React.createElement(Input, { type: "password", name: "password", id: "passwordInput", required: true, placeholder: "Password", value: this.state.password, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "passwordInput2" }, "*Confirm Your Password:"),
                    React.createElement(Input, { type: "password", name: "confirmPassword", id: "passwordInput2", required: true, placeholder: "Confirm Password", value: this.state.confirmPassword, onChange: e => this.handleChange(e) }),
                    React.createElement(Button, { className: "my-2", type: "button", color: "primary", onClick: this.handleReg }, "Register")))));
    }
}
export default connect((state) => state.user, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(Register);
//# sourceMappingURL=Register.js.map