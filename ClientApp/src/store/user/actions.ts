import { AppThunkAction } from '../index';
import { User, UserActionTypes, KnownAction, LoginModel, LoginErrors } from './types';
import { Post } from 'src/utils/apiFetch';

export function loginUser(_loginData: LoginModel): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.user && appState.user !== null) {
            // Send login request with provided user's details (username, password)
            Post('auth/login', _loginData)
                .then((data) => {
                    console.log(data);
                    let _errors: LoginErrors = data.errors;
                    let _user: User = data as User;
                    console.log(_user);

                    if (_errors) {
                        dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: _errors })
                    } else if (_user) {
                        // Current user info will be in localStorage
                        //localStorage.setItem("user", JSON.stringify(_user));
                        dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: _user });
                    }
                });

            dispatch({ type: UserActionTypes.LOGIN_USER, loginData: _loginData });
        }
    }
}