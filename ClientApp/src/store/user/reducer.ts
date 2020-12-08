import { Action, Reducer } from 'redux';
import { UserState, KnownAction, UserActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = { user: null, isUserLoading: false };

export const UserReducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return {
                user: state.user,
                isUserLoading: true
            };
        case UserActionTypes.SUCCESS_LOGIN_USER:
            return {
                user: action.user,
                isUserLoading: false
            };
        case UserActionTypes.FAILED_LOGIN_USER:
            return {
                user: state.user,
                isUserLoading: false
            };
        case UserActionTypes.LOGOUT_USER:
            return {
                user: null,
                isUserLoading: false
            };
        // Registration does not set user object in state
        case UserActionTypes.REGISTER_USER:
            return {
                user: null,
                isUserLoading: true
            };
        case UserActionTypes.SUCCESS_REGISTRATION_USER:
            return {
                user: null,
                isUserLoading: false
            };
        case UserActionTypes.FAILED_REGISTRATION_USER:
            return {
                user: null,
                isUserLoading: false
            };
        default:
            return state;
    }
};