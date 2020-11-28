import * as ItemTypes from './types';
import * as ItemReducer from './reducer';
import * as ItemActions from './actions';

export const Reducer: typeof ItemReducer.reducer = ItemReducer.reducer;
export const Actions = ItemActions;
export const Types = ItemTypes;