import { Alert, AlertActionTypes } from './types';

// Not standart action functions, their return objects need to be dispatched from other actions

export function alertShow(alerts: Alert[] | null) {
    return { type: AlertActionTypes.ALERT_SHOW, alerts: alerts };
}

export function alertClear() {
    return { type: AlertActionTypes.ALERT_CLEAR };
}