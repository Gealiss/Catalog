import * as React from 'react';
import { connect } from 'react-redux';
import * as CounterStore from '../store/Counter';
class Counter extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { "aria-live": "polite" },
                "Items total: ",
                React.createElement("strong", null, this.props.count)),
            React.createElement("div", { className: "d-flex justify-content-center" },
                React.createElement("button", { type: "button", className: "btn btn-primary", onClick: () => { this.props.incrementCounter(); } }, "Load more"))));
    }
}
;
export default connect((state) => state.counter, CounterStore.actionCreators)(Counter);
//# sourceMappingURL=Counter.js.map