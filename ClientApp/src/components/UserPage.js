import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
class UserPage extends React.Component {
    render() {
        // If user not exist
        if (!this.props.user) {
            return React.createElement(Redirect, { to: "/" });
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Hello, ",
                this.props.user.name),
            React.createElement("p", null,
                "Role: ",
                this.props.user.role),
            React.createElement("p", null,
                "Id: ",
                this.props.user.id),
            React.createElement("p", null,
                "Username: ",
                this.props.user.username),
            React.createElement("p", null,
                "Email: ",
                this.props.user.email)));
    }
}
export default connect((state) => (Object.assign({}, state.user)))(UserPage);
//# sourceMappingURL=UserPage.js.map