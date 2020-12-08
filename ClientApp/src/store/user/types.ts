// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
    isUserLoading: boolean;
    user: User | null;
}

// MODELS

export interface User {
    id: string;
    name: string;
    username: string;
    role: string;
    favorites?: string[];
    email?: string;
}

export enum UserRoles {
    Basic = "Basic",
    Admin = "Admin"
}

export interface LoginModel {
    username: string;
    password: string;
}

export enum UserModelErrors {
    IncorrectLogin = "Login error",
    IncorrectReg = "Registration error",
    Password = "Incorrect Password",
    Username = "Incorrect Username",
    Name = "Incorrect Name",
    ConfirmPassword = "Incorrect Confirm Password",
    Email = "Incorrect Email"
}

export interface RegisterModel {
    username: string;
    name: string;
    email?: string;
    password: string;
    confirmPassword: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface LoginUserAction {
    type: UserActionTypes.LOGIN_USER;
    loginData: LoginModel;
}
interface RegisterUserAction {
    type: UserActionTypes.REGISTER_USER;
    regData: RegisterModel;
}
interface SuccessLogin {
    type: UserActionTypes.SUCCESS_LOGIN_USER;
    user: User;
}
interface SuccessRegistration {
    type: UserActionTypes.SUCCESS_REGISTRATION_USER;
}
interface FailedLogin {
    type: UserActionTypes.FAILED_LOGIN_USER;
}
interface FailedRegistration {
    type: UserActionTypes.FAILED_REGISTRATION_USER;
}
interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = LoginUserAction | RegisterUserAction | SuccessLogin
    | SuccessRegistration | FailedLogin | FailedRegistration | LogoutUserAction;

//ENUM FOR TYPES
export enum UserActionTypes {
    LOGIN_USER = "LOGIN_USER",
    REGISTER_USER = "REGISTER_USER",
    SUCCESS_LOGIN_USER = "SUCCESS_LOGIN_USER",
    SUCCESS_REGISTRATION_USER = "SUCCESS_REGISTRATION_USER",
    FAILED_LOGIN_USER = "FAILED_LOGIN_USER",
    FAILED_REGISTRATION_USER = "FAILED_REGISTRATION_USER",
    LOGOUT_USER = "LOGOUT_USER"
}