// STATE - This defines the type of data maintained in the Redux store.

export interface AlertState {
    alerts: Alert[] | null;
}

//MODELS

export interface Alert {
    type: AlertMessageTypes;
    title: string;
    message: string | string[] | null;
}

export enum AlertMessageTypes {
    success = "success",
    error = "error",
    info = "info"
}

// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AlertShowAction {
    type: AlertActionTypes.ALERT_SHOW;
    alerts: Alert[] | null;
}
interface AlertClearAction {
    type: AlertActionTypes.ALERT_CLEAR;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export type KnownAction = AlertShowAction | AlertClearAction;

//ENUM FOR TYPES

export enum AlertActionTypes {
    ALERT_SHOW = "ALERT_SHOW",
    ALERT_CLEAR = "ALERT_CLEAR"
}