import * as Counter from './Counter';
import * as Filter from './Filter';
import { ItemsReducer } from './items/reducer';
import { UserReducer } from './user/reducer';
import { AlertReducer } from './alert/reducer';
import { CategoriesReducer } from './categories/reducer';
import { ShopsReducer } from './shops/reducer';
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    filter: Filter.reducer,
    items: ItemsReducer,
    user: UserReducer,
    alert: AlertReducer,
    categories: CategoriesReducer,
    shops: ShopsReducer
};
//# sourceMappingURL=index.js.map