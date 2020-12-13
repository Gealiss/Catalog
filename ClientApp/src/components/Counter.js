import * as React from 'react';
import { connect } from 'react-redux';
import * as CounterStore from '../store/Counter';
class Counter extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { "aria-live": "polite" },
                "Items total: ",
                React.createElement("strong", null, this.props.items.length)),
            React.createElement("div", { className: "d-flex justify-content-center" }, this.props.count < this.props.items.length
                ?
                    React.createElement("button", { type: "button", className: "btn btn-primary", onClick: () => { this.props.incrementCounter(); } }, "Load more")
                : null)));
    }
}
;
export default connect((state) => (Object.assign(Object.assign({}, state.counter), state.items)), CounterStore.actionCreators)(Counter);
//# sourceMappingURL=Counter.js.map