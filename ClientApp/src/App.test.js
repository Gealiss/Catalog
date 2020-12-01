import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
it('renders without crashing', () => {
    const storeFake = (state) => ({
        default: () => { },
        subscribe: () => { },
        dispatch: () => { },
        getState: () => (Object.assign({}, state))
    });
    const store = storeFake({});
    ReactDOM.render(React.createElement(Provider, { store: store },
        React.createElement(MemoryRouter, null,
            React.createElement(App, null))), document.createElement('div'));
});
//# sourceMappingURL=App.test.js.map