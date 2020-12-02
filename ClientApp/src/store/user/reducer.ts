import { Action, Reducer } from 'redux';
import { UserState, KnownAction, UserActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = { user: null, isUserLogging: false };

export const UserReducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return {
                user: state.user,
                isUserLogging: true
            };
        case UserActionTypes.SUCCESS_LOGIN_USER:
            return {
                user: action.user,
                isUserLogging: false
            };
        case UserActionTypes.FAILED_LOGIN_USER:
            return {
                user: state.user,
                isUserLogging: false
            };
        default:
            return state;
    }
};