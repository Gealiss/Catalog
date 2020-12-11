import { Action, Reducer } from 'redux';
import { CategoriesState, KnownAction, CategoryActionTypes } from './types';

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CategoriesState = { categories: [], isCategoriesLoading: false };

export const CategoriesReducer: Reducer<CategoriesState> = (state: CategoriesState | undefined, incomingAction: Action): CategoriesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case CategoryActionTypes.REQUEST_CATEGORIES:
            return {
                categories: state.categories,
                isCategoriesLoading: true
            };
        case CategoryActionTypes.RECEIVE_CATEGORIES:
            return {
                categories: action.categories,
                isCategoriesLoading: false
            };
        default:
            return state;
    }
};