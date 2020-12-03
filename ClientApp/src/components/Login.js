import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
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
            React.createElement("h2", null, "Login:"),
            React.createElement(Input, { type: "text", name: "username", value: this.state.username, onChange: e => this.handleChange(e) }),
            React.createElement(Input, { type: "password", name: "password", value: this.state.password, onChange: e => this.handleChange(e) }),
            React.createElement(Input, { type: "button", value: "Login", onClick: this.handleLogin }),
            this.props.user != null ? React.createElement("p", null, "Login Success") : null));
    }
}
export default connect((state) => state.user, // Selects which state properties are merged into the component's props
UserActionCreators // Selects which action creators are merged into the component's props
)(Login);
//# sourceMappingURL=Login.js.map