// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ShopsState {
    isShopsLoading: boolean;
    shops: Shop[];
}

export interface Shop {
    id: string;
    name: string;
    description?: string;
}

export enum ShopModelErrors {
    Id = "Wrong shop id",
    Name = "Incorrect name",
    Description = "Incorrect description"
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestShopsAction {
    type: ShopActionTypes.REQUEST_SHOPS;
}
interface ReceiveShopsAction {
    type: ShopActionTypes.RECEIVE_SHOPS;
    shops: Shop[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestShopsAction | ReceiveShopsAction;

//ENUM FOR TYPES
export enum ShopActionTypes {
    REQUEST_SHOPS = "REQUEST_SHOPS",
    RECEIVE_SHOPS = "RECEIVE_SHOPS"
}