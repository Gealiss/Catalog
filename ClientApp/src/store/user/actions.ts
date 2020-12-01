import { AppThunkAction } from '../index';
import { User, UserActionTypes, KnownAction, LoginModel, LoginErrors } from './types';
import { Post } from 'src/utils/apiFetch';
import { string } from '../../../node_modules/postcss-selector-parser/postcss-selector-parser';

export function loginUser(_loginData: LoginModel): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.user && appState.user !== null) {
            // Send login request with provided user's details (username, password)
            Post('auth/login', _loginData)
                .then((data) => {
                    console.log(data);
                    let _errors: LoginErrors = data.errors;
                    let _user: User = data.user as User;
                    let _jwt = data.jwt;
                    console.log(_user);

                    if (_errors) {
                        dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: _errors })
                    } else if (_jwt == null) {
                        dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: null })
                    } else if (_user) {
                        // Current user info will be in localStorage
                        localStorage.setItem("jwt", JSON.stringify(_jwt));
                        dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: _user });
                    }
                });

            dispatch({ type: UserActionTypes.LOGIN_USER, loginData: _loginData });
        }
    }
}