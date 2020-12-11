import { Action, Reducer } from 'redux';
import { ShopsState, KnownAction, ShopActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ShopsState = { shops: [], isShopsLoading: false };

export const ShopsReducer: Reducer<ShopsState> = (state: ShopsState | undefined, incomingAction: Action): ShopsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ShopActionTypes.REQUEST_SHOPS:
            return {
                shops: state.shops,
                isShopsLoading: true
            };
        case ShopActionTypes.RECEIVE_SHOPS:
            return {
                shops: action.shops,
                isShopsLoading: false
            };
        default:
            return state;
    }
};