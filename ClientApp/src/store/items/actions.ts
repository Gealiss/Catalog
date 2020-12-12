import { AppThunkAction } from '../index';
import { Item, ItemActionTypes, KnownAction, ItemModelErrors } from './types';
import { Get, Post } from 'src/utils/apiFetch';
import * as AlertTypes from '../alert/types';
import { FilterState } from '../Filter';

// Load all items
export function requestItems(): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.items) {

            // If filter set up
            let filter: FilterState = appState.filter ? appState.filter : {};

            if (Object.keys(filter).length !== 0) {
                Post(`api/items/filter`, filter)
                    .then(res => {
                        if (res.isOk) {
                            let data: Item[] = res.data as Item[];
                            dispatch({ type: ItemActionTypes.RECEIVE_ITEMS, items: data });
                        } else {
                            dispatch({ type: ItemActionTypes.FAILED_RECEIVE_ITEMS });
                        }
                    });
                dispatch({ type: ItemActionTypes.REQUEST_ITEMS });
                return;
            }

            Get(`api/items`)
                .then(res => {
                    if (res.isOk) {
                        let data: Item[] = res.data as Item[];
                        dispatch({ type: ItemActionTypes.RECEIVE_ITEMS, items: data });
                    } else {
                        dispatch({ type: ItemActionTypes.FAILED_RECEIVE_ITEMS });
                    }
                });
            dispatch({ type: ItemActionTypes.REQUEST_ITEMS });
        }
    }
}

// Load one item
export function requestItem(itemId: string): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.items) {
            Get(`api/items/${itemId}`)
                .then(res => {
                    if (res.isOk) {
                        let data: Item[] = [(res.data as Item)];
                        dispatch({ type: ItemActionTypes.RECEIVE_ITEMS, items: data });
                    } else {
                        dispatch({ type: ItemActionTypes.FAILED_RECEIVE_ITEMS });
                    }
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
        error = data[e] ? data[e] : null;
        if (error != null) {
            let title = (ItemModelErrors as any)[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response

    return alerts;
}