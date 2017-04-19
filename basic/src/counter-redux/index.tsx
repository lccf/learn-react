import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducer';
import Counter from './counter';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let initialState = { count: 0 };
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);
console.log(store.getState());

export default function(rootEl: HTMLElement) {
    render(
        <Provider store={ store }>
            <Counter />
        </Provider>,
        rootEl
    )
}