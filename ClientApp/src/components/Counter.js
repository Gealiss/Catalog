import * as React from 'react';
import { connect } from 'react-redux';
import * as CounterStore from '../store/Counter';
class Counter extends React.PureComponent {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Counter"),
            React.createElement("p", null, "This is a simple example of a React component."),
            React.createElement("p", { "aria-live": "polite" },
                "Current count: ",
                React.createElement("strong", null, this.props.count)),
            React.createElement("button", { type: "button", className: "btn btn-primary btn-lg", onClick: () => { this.props.increment(); } }, "Increment")));
    }
}
;
export default connect((state) => state.counter, CounterStore.actionCreators)(Counter);
//# sourceMappingURL=Counter.js.map