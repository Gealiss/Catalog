﻿// -----------------
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
    type: ItemActionTypes.REQUEST_ITEMS;
    startItemIndex?: number;
}
interface ReceiveItemsAction {
    type: ItemActionTypes.RECEIVE_ITEMS;
    startItemIndex?: number;
    items: Item[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestItemsAction | ReceiveItemsAction;

//ENUM FOR TYPES
export enum ItemActionTypes {
    REQUEST_ITEMS = "REQUEST_ITEMS",
    RECEIVE_ITEMS = "RECEIVE_ITEMS"
}