import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as CounterStore from '../store/Counter';

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators;

class Counter extends React.Component<CounterProps> {

    public render() {
        return (
            <>
                <p aria-live="polite">Items total: <strong>{this.props.count}</strong></p>
                <div className="d-flex justify-content-center">
                        <button type="button"
                            className="btn btn-primary"
                            onClick={() => { this.props.incrementCounter(); }}>
                            Load more
                        </button>
                </div>
            </>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
