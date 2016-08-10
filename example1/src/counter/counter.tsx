/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';

interface CounterProps {
    count: number;
}

class Counter extends React.Component<CounterProps, CounterProps> {
    constructor(props: CounterProps) {
        super(props);
        this.state = props;
    }

    increment() {
        let { count } = this.state;
        count += 1;
        this.setState({count});
    }

    decrement() {
        let { count } = this.state;
        count -= 1;
        this.setState({count});
    }

    asyncIncrement() {
        setTimeout(function() {
            this.increment();
        }.bind(this), 1000);
    }

    render() {
        const { count } = this.state;
        return (
            <div style={ {transform: 'scale(1.1)', marginTop: 100, marginLeft: 200} }>
                <h3>react counter</h3>
                <input value={ count } readOnly />
                <button onClick={ () => this.increment() }>+</button>
                <button onClick={ () => this.decrement() }>-</button>
                <button onClick={ () => this.asyncIncrement() }>async increment</button>
            </div>
        );
    };
}

export default Counter;