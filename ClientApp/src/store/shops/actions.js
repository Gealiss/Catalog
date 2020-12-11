import { ShopActionTypes, ShopModelErrors } from './types';
import * as AlertTypes from '../alert/types';
// Load all items
export function requestShops() {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.shops) {
            fetch(`api/shops`)
                .then(response => response.json())
                .then(data => {
                dispatch({ type: ShopActionTypes.RECEIVE_SHOPS, shops: data });
            });
            dispatch({ type: ShopActionTypes.REQUEST_SHOPS });
        }
    };
}
// TODO: define other types of response objects such as notifications ..
// Iterates through each possible field of error response object
export function parseShopErrors(data) {
    let error = null;
    let alerts = [];
    for (var e in ShopModelErrors) {
        error = data[e] ? data[e] : null;
        if (error != null) {
            let title = ShopModelErrors[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response
    return alerts;
}
//# sourceMappingURL=actions.js.map