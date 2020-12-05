import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import * as UserActionCreators from '../store/user/actions';
import { Redirect } from 'react-router-dom';
class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', submitted: false };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleLogin() {
        let loginData = { username: this.state.username, password: this.state.password };
        console.log(loginData);
        this.props.loginUser(loginData);
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
                    React.createElement("h2", null, "Login:"),
                    React.createElement(Label, { for: "usernameInput" }, "Username:"),
                    React.createElement(Input, { type: "text", name: "username", id: "usernameInput", required: true, value: this.state.username, onChange: e => this.handleChange(e) }),
                    React.createElement(Label, { for: "passwordInput" }, "Password:"),
                    React.createElement(Input, { type: "password", name: "password", id: "passwordInput", required: true, value: this.state.password, onChange: e => this.handleChange(e) }),
                    React.createElement(Button, { className: "my-2", type: "button", color: "primary", onClick: this.handleLogin }, "Login")))));
    }
}
export default connect((state) => state.user, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(Login);
//# sourceMappingURL=Login.js.map