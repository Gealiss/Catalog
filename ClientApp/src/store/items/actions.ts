import { AppThunkAction } from '../index';
import { Item, ItemActionTypes, KnownAction } from './types';

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

export const actionCreators = {
    requestItems: requestItems
}