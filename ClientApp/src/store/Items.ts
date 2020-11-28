﻿import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ItemsState {
    isLoading: boolean;
    startItemIndex?: number;
    items: Item[];
}

export interface Item {
    id: string;
    name: string;
    category_name: string;
    img: string;
    description: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestItemsAction {
    type: 'REQUEST_ITEMS';
    startItemIndex?: number;
}
interface ReceiveItemsAction {
    type: 'RECEIVE_ITEMS';
    startItemIndex?: number;
    items: Item[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestItemsAction | ReceiveItemsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestItems: (startItemIndex?: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.items && appState.items.items.length === 0) {
            fetch(`api/items`)
                .then(response => response.json() as Promise<Item[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ITEMS', items: data });
                });

            dispatch({ type: 'REQUEST_ITEMS' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ItemsState = { items: [], isLoading: false };

export const reducer: Reducer<ItemsState> = (state: ItemsState | undefined, incomingAction: Action): ItemsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ITEMS':
            return {
                items: state.items,
                isLoading: true
            };
        case 'RECEIVE_ITEMS':
            return {
                items: action.items,
                isLoading: false
            };
        default:
            return state;
    }
};