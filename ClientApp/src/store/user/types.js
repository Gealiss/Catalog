// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export var UserLoginErrors;
(function (UserLoginErrors) {
    UserLoginErrors["IncorrectLogin"] = "Incorrect Login";
    UserLoginErrors["Password"] = "Incorrect Password";
    UserLoginErrors["Username"] = "Incorrect Username";
})(UserLoginErrors || (UserLoginErrors = {}));
//ENUM FOR TYPES
export var UserActionTypes;
(function (UserActionTypes) {
    UserActionTypes["LOGIN_USER"] = "LOGIN_USER";
    UserActionTypes["REGISTER_USER"] = "REGISTER_USER";
    UserActionTypes["SUCCESS_LOGIN_USER"] = "SUCCESS_LOGIN_USER";
    UserActionTypes["SUCCESS_REGISTRATION_USER"] = "SUCCESS_REGISTRATION_USER";
    UserActionTypes["FAILED_LOGIN_USER"] = "FAILED_LOGIN_USER";
    UserActionTypes["FAILED_REGISTRATION_USER"] = "FAILED_REGISTRATION_USER";
    UserActionTypes["LOGOUT_USER"] = "LOGOUT_USER";
})(UserActionTypes || (UserActionTypes = {}));
//# sourceMappingURL=types.js.map