import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as CounterStore from '../store/Counter';
import { ItemsState } from '../store/items/types';

type CounterProps =
    CounterStore.CounterState & ItemsState &
    typeof CounterStore.actionCreators;

class Counter extends React.Component<CounterProps> {

    public render() {
        return (
            <>
                <p aria-live="polite">Items total: <strong>{this.props.items.length}</strong></p>
                <div className="d-flex justify-content-center">
                    {
                        this.props.count < this.props.items.length
                            ?
                            <button type="button"
                                className="btn btn-primary"
                                onClick={() => { this.props.incrementCounter(); }}>
                                Load more
                            </button>
                            : null
                    }
                    
                </div>
            </>
        );
    }
};

export default connect(
    (state: ApplicationState) => ({ ...state.counter, ...state.items }),
    CounterStore.actionCreators
)(Counter);
