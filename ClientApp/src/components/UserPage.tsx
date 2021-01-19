import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { ApplicationState } from '../store/index';
import { User, UserState } from '../store/user/types';


type UserPageProps = UserState;

class UserPage extends React.Component<UserPageProps>{
    public render() {
        // If user not exist
        if (!this.props.user) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <h2>Hello, {this.props.user.name}</h2>
                <p>Role: {this.props.user.role}</p>
                <p>Id: {this.props.user.id}</p>
                <p>Username: {this.props.user.username}</p>
                <p>Email: {this.props.user.email}</p>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.user })
)(UserPage);