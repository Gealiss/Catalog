import { AppThunkAction } from '../index';
import { UserLoginErrors, UserActionTypes, KnownAction, LoginModel, LoginErrors } from './types';
import { alertSuccess, alertError } from '../alert/actions';
import { Get, Post } from 'src/utils/apiFetch';

// Also make this actions support alert actions 
import * as AlertTypes from '../alert/types'; 

export function loginUser(_loginData: LoginModel): AppThunkAction<KnownAction | AlertTypes.KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.user && appState.user.user == null) {
            // Send login request with provided user's details (username, password)
            Post('auth/login', _loginData)
                .then((res) => {
                    console.log("All response", res);
                    if (res.isOk) {
                        // No JWT for localStorage
                        dispatch(alertSuccess("Successful login!", null));
                        dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: res.data });
                    } else {
                        // Try parse error from data and do alert
                        let parsedError = parseError(res.data);
                        if (parsedError != null) {
                            dispatch(alertError(parsedError.title, parsedError.message));
                        } else {
                            dispatch(alertError("Error " + res.status, "Some error occured."));
                        }
                        dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: res.data })
                    }
                });

            dispatch({ type: UserActionTypes.LOGIN_USER, loginData: _loginData });
        }
    }
}

export function checkToken(): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        Post('auth/checkToken')
            .then(res => {
                if (res.isOk) {
                    dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: res.data });
                } else {
                    dispatch({ type: UserActionTypes.LOGOUT_USER });
                }
            });
    }
}

export function logoutUser(): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        Get('auth/logout')
            .then(res => {
                    dispatch({ type: UserActionTypes.LOGOUT_USER });
            });
    }
}

// Iterates through each possible field of error response object
function parseError(data: any) {
    let error = null;
    for (var e in UserLoginErrors) {
        error = data[e] != undefined ? data[e]: null;
        if (error != null) {
            //var color: Color = (<any>Color)[green];
            let title = (UserLoginErrors as any)[e];
            return { title: title, message: error };
        }
    }
    return null;
}