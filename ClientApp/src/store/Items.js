"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestItems: function (startItemIndex) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        if (appState && appState.weatherForecasts && startItemIndex !== appState.weatherForecasts.startDateIndex) {
            fetch("weatherforecast")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_ITEMS', startItemIndex: startItemIndex, items: data });
            });
            dispatch({ type: 'REQUEST_ITEMS', startItemIndex: startItemIndex });
        }
    }; }
};
//# sourceMappingURL=Items.js.map