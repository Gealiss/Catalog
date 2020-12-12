﻿import { Action, Reducer } from 'redux';
import { ItemsState, KnownAction, ItemActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ItemsState = { items: [], isLoading: false, itemsCount: 10 };

export const ItemsReducer: Reducer<ItemsState> = (state: ItemsState | undefined, incomingAction: Action): ItemsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ItemActionTypes.REQUEST_ITEMS:
            return {
                itemsCount: state.itemsCount,
                items: state.items,
                isLoading: true
            };
        case ItemActionTypes.RECEIVE_ITEMS:
            return {
                itemsCount: state.itemsCount,
                items: action.items,
                isLoading: false
            };
        case ItemActionTypes.FAILED_RECEIVE_ITEMS:
            return {
                itemsCount: state.itemsCount,
                items: state.items,
                isLoading: false
            };
        default:
            return state;
    }
};