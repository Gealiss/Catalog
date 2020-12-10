import { AppThunkAction } from '../index';
import { Item, ItemActionTypes, KnownAction, ItemModelErrors } from './types';
import { alertShow } from '../alert/actions';
import { Get, Post } from 'src/utils/apiFetch';
import * as AlertTypes from '../alert/types';

// Load all items
export function requestItems(): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.items && appState.items.items.length === 0) {
            fetch(`api/items`)
                .then(response => response.json() as Promise<Item[]>)
                .then(data => {
                    dispatch({ type: ItemActionTypes.RECEIVE_ITEMS, items: data });
                });
            dispatch({ type: ItemActionTypes.REQUEST_ITEMS });
        }
    }
}

// TODO: define other types of response objects such as notifications ..
// Iterates through each possible field of error response object
export function parseItemErrors(data: any): AlertTypes.Alert[] {
    let error = null;
    let alerts: AlertTypes.Alert[] = [];

    for (var e in ItemModelErrors) {
        error = data[e] != undefined ? data[e] : null;
        if (error != null) {
            let title = (ItemModelErrors as any)[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response

    return alerts;
}