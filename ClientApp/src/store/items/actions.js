import { ItemActionTypes, ItemModelErrors } from './types';
import * as AlertTypes from '../alert/types';
export function requestItems() {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.items && appState.items.items.length === 0) {
            fetch(`api/items`)
                .then(response => response.json())
                .then(data => {
                dispatch({ type: ItemActionTypes.RECEIVE_ITEMS, items: data });
            });
            dispatch({ type: ItemActionTypes.REQUEST_ITEMS });
        }
    };
}
// TODO: define other types of response objects such as notifications ..
// Iterates through each possible field of error response object
export function parseItemErrors(data) {
    let error = null;
    let alerts = [];
    for (var e in ItemModelErrors) {
        error = data[e] != undefined ? data[e] : null;
        if (error != null) {
            let title = ItemModelErrors[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response
    return alerts;
}
//# sourceMappingURL=actions.js.map