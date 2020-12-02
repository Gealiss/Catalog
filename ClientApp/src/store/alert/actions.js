import { AlertActionTypes } from './types';
// Not standart action functions, their return objects need to be dispatched from other actions
export function alertSuccess(title, message) {
    return { type: AlertActionTypes.ALERT_SUCCESS, alert: { title: title, message: message } };
}
export function alertError(title, message) {
    return { type: AlertActionTypes.ALERT_ERROR, alert: { title: title, message: message } };
}
export function alertNotification(title, message) {
    return { type: AlertActionTypes.ALERT_NOTIFICATION, alert: { title: title, message: message } };
}
export function alertClear() {
    return { type: AlertActionTypes.ALERT_CLEAR };
}
//# sourceMappingURL=actions.js.map