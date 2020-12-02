import { Action, Reducer } from 'redux';
import { AlertState, KnownAction, AlertActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AlertState = { alert: null };

export const AlertReducer: Reducer<AlertState> = (state: AlertState | undefined, incomingAction: Action): AlertState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case AlertActionTypes.ALERT_SUCCESS:
            return {
                alert: action.alert
            };
        case AlertActionTypes.ALERT_ERROR:
            return {
                alert: action.alert
            };
        case AlertActionTypes.ALERT_NOTIFICATION:
            return {
                alert: action.alert
            };
        case AlertActionTypes.ALERT_CLEAR:
            return {
                alert: null
            };
        default:
            return state;
    }
};