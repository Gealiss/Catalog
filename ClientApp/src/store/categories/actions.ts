import { AppThunkAction } from '../index';
import { Category, CategoryActionTypes, KnownAction, CategoryModelErrors } from './types';
import * as AlertTypes from '../alert/types';

// Load all items
export function requestCategories(): AppThunkAction<KnownAction> {
    return (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.categories) {
            fetch(`api/categories`)
                .then(response => response.json() as Promise<Category[]>)
                .then(data => {
                    dispatch({ type: CategoryActionTypes.RECEIVE_CATEGORIES, categories: data });
                });
            dispatch({ type: CategoryActionTypes.REQUEST_CATEGORIES });
        }
    }
}

// TODO: define other types of response objects such as notifications ..
// Iterates through each possible field of error response object
export function parseCategoryErrors(data: any): AlertTypes.Alert[] {
    let error = null;
    let alerts: AlertTypes.Alert[] = [];

    for (var e in CategoryModelErrors) {
        error = data[e] ? data[e] : null;
        if (error != null) {
            let title = (CategoryModelErrors as any)[e];
            alerts.push({ type: AlertTypes.AlertMessageTypes.error, title: title, message: error });
        }
    }
    // TODO: iterate through other defined types of response

    return alerts;
}