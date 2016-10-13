/// <reference path="./declare.d.ts" />
/// <reference path="./declare.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';

import {
  actionIncrement,
  actionDecrement,
  actionIncrementAsync,
} from './actions';

interface CounterProps {
  data: {
    count: number;
  };
  externalCallback: any;
  dataLabel: string;
  dispatch: any;
}

export default class Counter extends React.Component<CounterProps, any> {
  constructor(props: CounterProps) {
    super(props);
  }
  render() {
    const { dispatch, dataLabel, data: { count }} = this.props;
    return (
      <div>
        <span>{ count }</span>
        <button onClick={ () => dispatch(actionIncrement(dataLabel)) }>Increment</button>
        <button onClick={ () => dispatch(actionDecrement(dataLabel)) }>Decrement</button>
        <button onClick={ ()=> dispatch(actionIncrementAsync(dataLabel)) }>Increment Async</button>
      </div>
    );
  }
}