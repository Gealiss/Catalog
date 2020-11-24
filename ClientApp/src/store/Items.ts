import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ItemsState {
    isLoading: boolean;
    startItemIndex?: number;
    items: Items[];
}

export interface Items {
    id: string;
    name: string;
    category_name: string;
    image: string;
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
    items: Items[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestItemsAction | ReceiveItemsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestItems: (startItemIndex?: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.weatherForecasts && startItemIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<Items[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ITEMS', startItemIndex: startItemIndex, items: data });
                });

            dispatch({ type: 'REQUEST_ITEMS', startItemIndex: startItemIndex });
        }
    }
};