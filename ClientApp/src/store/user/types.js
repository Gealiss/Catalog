// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export var UserModelErrors;
(function (UserModelErrors) {
    UserModelErrors["IncorrectLogin"] = "Login error";
    UserModelErrors["IncorrectReg"] = "Registration error";
    UserModelErrors["Password"] = "Incorrect Password";
    UserModelErrors["Username"] = "Incorrect Username";
    UserModelErrors["Name"] = "Incorrect Name";
    UserModelErrors["ConfirmPassword"] = "Incorrect Confirm Password";
    UserModelErrors["Email"] = "Incorrect Email";
})(UserModelErrors || (UserModelErrors = {}));
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