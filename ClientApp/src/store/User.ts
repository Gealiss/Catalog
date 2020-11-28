import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
    isLoading: boolean;
    startItemIndex?: number;
    user: User;
}

//{"_id":{"$oid":"5fb00642931071071b720823"},"Name":"John","Username":"john93","Email":null,"Role":"Basic","Favorites":null,"PassHash":"z4p1H/ydiVgvz0p1bWL7M1MsMekiHe3dqv05hmDeYjk=","Salt":"BVvQwznKHQjZTgm767jDOw=="}

export interface User {
    id: string;
    name: string;
    username: string;
    email?: string;
    role: string;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface RegisterModel {
    username: string;
    name: string;
    email?: string;
    password: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface LoginUserAction {
    type: 'LOGIN_USER';
    loginData: LoginModel;
}
interface RegisterUserAction {
    type: 'REGISTER_USER';
    regData: RegisterModel;
}
interface SuccessLogin {
    type: 'SUCCESS_LOGIN_USER';
    user: User;
}
interface SuccessRegistration {
    type: 'SUCCESS_REGISTRATION_USER';
    user: User;
}
interface FailedLogin {
    type: 'FAILED_LOGIN_USER';
    message: string;
}
interface FailedRegistration {
    type: 'FAILED_REGISTRATION_USER';
    message: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = LoginUserAction | RegisterUserAction | SuccessLogin
    | SuccessRegistration | FailedLogin | FailedRegistration;

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