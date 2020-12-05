import { Alert, AlertActionTypes } from './types';

// Not standart action functions, their return objects need to be dispatched from other actions

export function alertSuccess(alerts: Alert[] | null) {
    return { type: AlertActionTypes.ALERT_SUCCESS, alerts: alerts };
}

export function alertError(alerts: Alert[] | null) {
    return { type: AlertActionTypes.ALERT_ERROR, alerts: alerts };
}

export function alertNotification(alerts: Alert[] | null) {
    return { type: AlertActionTypes.ALERT_NOTIFICATION, alerts: alerts };
}

export function alertClear() {
    return { type: AlertActionTypes.ALERT_CLEAR };
}