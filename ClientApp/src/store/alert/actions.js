import { AlertActionTypes } from './types';
// Not standart action functions, their return objects need to be dispatched from other actions
export function alertSuccess(alerts) {
    return { type: AlertActionTypes.ALERT_SUCCESS, alerts: alerts };
}
export function alertError(alerts) {
    return { type: AlertActionTypes.ALERT_ERROR, alerts: alerts };
}
export function alertNotification(alerts) {
    return { type: AlertActionTypes.ALERT_NOTIFICATION, alerts: alerts };
}
export function alertClear() {
    return { type: AlertActionTypes.ALERT_CLEAR };
}
//# sourceMappingURL=actions.js.map