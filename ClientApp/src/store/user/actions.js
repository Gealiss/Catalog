import { UserActionTypes } from './types';
import { Post } from 'src/utils/apiFetch';
export function loginUser(_loginData) {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.user && appState.user !== null) {
            // Send login request with provided user's details (username, password)
            Post('auth/login', _loginData)
                .then((data) => {
                console.log(data);
                let _errors = data.errors;
                let _user = data.user;
                let _jwt = data.jwt;
                console.log(_user);
                if (_errors) {
                    dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: _errors });
                }
                else if (_jwt == null) {
                    dispatch({ type: UserActionTypes.FAILED_LOGIN_USER, errors: null });
                }
                else if (_user) {
                    // Current user info will be in localStorage
                    localStorage.setItem("jwt", JSON.stringify(_jwt));
                    dispatch({ type: UserActionTypes.SUCCESS_LOGIN_USER, user: _user });
                }
            });
            dispatch({ type: UserActionTypes.LOGIN_USER, loginData: _loginData });
        }
    };
}
//# sourceMappingURL=actions.js.map