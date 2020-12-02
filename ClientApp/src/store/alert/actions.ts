import { AlertActionTypes } from './types';

// Not standart action functions, their return objects need to be dispatched from other actions

export function alertSuccess(title: string, message : string | null) {
    return { type: AlertActionTypes.ALERT_SUCCESS, alert: { title: title, message: message } };
}

export function alertError(title: string, message: string | null) {
    return { type: AlertActionTypes.ALERT_ERROR, alert: { title: title, message: message } };
}

export function alertNotification(title: string, message: string | null) {
    return { type: AlertActionTypes.ALERT_NOTIFICATION, alert: { title: title, message: message } };
}

export function alertClear() {
    return { type: AlertActionTypes.ALERT_CLEAR };
}