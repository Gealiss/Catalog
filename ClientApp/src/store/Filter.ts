import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface FilterState {
    name?: string;
    categoriesId?: string[];
    shopsId?: string[];
    priceAsc?: boolean;
    priceDesc?: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface SetFilterAction { type: 'SET_FILTER', filter: FilterState }
export interface ResetFilterAction { type: 'RESET_FILTER' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = SetFilterAction | ResetFilterAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setFilter: (filter: FilterState) => ({ type: 'SET_FILTER', filter: filter } as SetFilterAction),
    resetFilter: () => ({ type: 'RESET_FILTER' } as ResetFilterAction)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: FilterState = {  };

export const reducer: Reducer<FilterState> = (state: FilterState | undefined, incomingAction: Action): FilterState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_FILTER':
            return { ...action.filter };
        case 'RESET_FILTER':
            return { ...unloadedState };
        default:
            return state;
    }
};
