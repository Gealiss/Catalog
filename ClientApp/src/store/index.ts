import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
//import * as Items from './Items';

// ITEMS
import { ItemsState } from './items/types';
import { ItemsReducer } from './items/reducer';

// USER
import { UserState } from './user/types'
import { UserReducer } from './user/reducer';

// ALERT
import { AlertState } from './alert/types'
import { AlertReducer } from './alert/reducer';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    items: ItemsState | undefined;
    user: UserState | undefined;
    alert: AlertState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    items: ItemsReducer,
    user: UserReducer,
    alert: AlertReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
