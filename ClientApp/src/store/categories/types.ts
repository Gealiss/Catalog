// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CategoriesState {
    isCategoriesLoading: boolean;
    categories: Category[];
}

export interface Category {
    name: string;
    description?: string;
}

export enum CategoryModelErrors {
    Name = "Incorrect name",
    Description = "Incorrect description"
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCategoriesAction {
    type: CategoryActionTypes.REQUEST_CATEGORIES;
}
interface ReceiveCategoriesAction {
    type: CategoryActionTypes.RECEIVE_CATEGORIES;
    categories: Category[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestCategoriesAction | ReceiveCategoriesAction;

//ENUM FOR TYPES
export enum CategoryActionTypes {
    REQUEST_CATEGORIES = "REQUEST_CATEGORIES",
    RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
}