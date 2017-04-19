import * as React from 'react';
import { connect } from 'react-redux';
import { actionIncrement, actionDecrement, actionSyncIncrement } from './actions';

interface CounterProps {
    count: number;
    dispatch?: any;
}

class Counter extends React.Component<CounterProps, any> {
    constructor(props: CounterProps) {
        super(props);
    }

    render() {
        const { count, dispatch } = this.props;
        return (
            <div style={ {transform: 'scale(1.2)', marginTop: 100, marginLeft: 200} }>
                <h3>react counter with redux</h3>
                <input value={ count.toString() } readOnly />
                <button onClick={ () => dispatch(actionIncrement()) }>+</button>
                <button onClick={ () => dispatch(actionDecrement()) }>-</button>
                <button onClick={ () => dispatch(actionSyncIncrement())}>sync increment</button>
            </div>
        );
    };
}

export default connect(state => state)(Counter);