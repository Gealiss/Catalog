import { AppThunkAction } from '../index';
import { UserModelErrors, UserActionTypes, KnownAction, LoginModel, RegisterModel } from './types';
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

                    // Alerts object
                    let alerts: AlertTypes.Alert[] = [];
                    if (res.isOk) {
                        // Push success alert
                        alerts.push({ title: "Successful login!", message: null });
                        dispatch(alertSuccess(alerts));
                        dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: res.data });
                    } else {
                        // Try parse error from data and do alert
                        alerts = parseErrors(res.data);
                        if (alerts.length != 0) {
                            dispatch(alertError(alerts));
                        } else {
                            // Push unpredicted error alert
                            alerts.push({ title: "Error " + res.status, message: "Some error occured." });
                            dispatch(alertError(alerts));
                        }
                        dispatch({ type: UserActionTypes.FAILED_LOGIN_USER })
                    }
                });

            dispatch({ type: UserActionTypes.LOGIN_USER, loginData: _loginData });
        }
    }
}

export function registerUser(_regData: RegisterModel): AppThunkAction<KnownAction | AlertTypes.KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();

        if (appState && appState.user && appState.user.user == null) {
            Post('auth/register', _regData)
                .then((res) => {
                    console.log("All response", res);

                    // Alerts object
                    let alerts: AlertTypes.Alert[] = [];
                    if (res.isOk) {
                        // Push success alert
                        alerts.push({ title: "Successful registration!", message: null });
                        dispatch(alertSuccess(alerts));
                        dispatch({ type: UserActionTypes.SUCCESS_REGISTRATION_USER });
                    } else {
                        // Try parse errors from data and do alerts
                        alerts = parseErrors(res.data);
                        if (alerts.length != 0) {
                            dispatch(alertError(alerts));
                        } else {
                            // Push unpredicted error alert
                            alerts.push({ title: "Error " + res.status, message: "Some error occured." });
                            dispatch(alertError(alerts));
                        }
                        dispatch({ type: UserActionTypes.FAILED_REGISTRATION_USER })
                    }
                });

            dispatch({ type: UserActionTypes.REGISTER_USER, regData: _regData });
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
function parseErrors(data: any): AlertTypes.Alert[] {
    let error = null;
    let alerts: AlertTypes.Alert[] = [];

    for (var e in UserModelErrors) {
        error = data[e] != undefined ? data[e]: null;
        if (error != null) {
            //var color: Color = (<any>Color)[green];
            let title = (UserModelErrors as any)[e];
            alerts.push({ title: title, message: error });
        }
    }
    return alerts;
}