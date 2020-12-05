// STATE - This defines the type of data maintained in the Redux store.

export interface AlertState {
    alerts: Alert[] | null;
}

//MODELS

export interface Alert {
    title: string;
    message: string | null;
}

// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AlertSuccessAction {
    type: AlertActionTypes.ALERT_SUCCESS;
    alerts: Alert[] | null;
}
interface AlertErrorAction {
    type: AlertActionTypes.ALERT_ERROR;
    alerts: Alert[] | null;
}
interface AlertNotificationAction {
    type: AlertActionTypes.ALERT_NOTIFICATION;
    alerts: Alert[] | null;
}
interface AlertClearAction {
    type: AlertActionTypes.ALERT_CLEAR;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type KnownAction = AlertSuccessAction | AlertErrorAction | AlertNotificationAction | AlertClearAction;

//ENUM FOR TYPES

export enum AlertActionTypes {
    ALERT_SUCCESS = "ALERT_SUCCESS",
    ALERT_ERROR = "ALERT_ERROR",
    ALERT_NOTIFICATION = "ALERT_NOTIFICATION",
    ALERT_CLEAR = "ALERT_CLEAR"
}