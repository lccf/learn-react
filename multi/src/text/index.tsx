/// <reference path="./declare.d.ts" />
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import Text from './text';

export { default as Text } from './text';
export { default as default } from './reducer';

// import reducer from './reducer';
// export default reducer;

export let render = function (rootEl: HTMLElement, store: any, position: string) {
  let TextComponent = connect((state: {[id: string]: string}) => {
    let text: string = state[position];
    let result = {
      data: { text },
      position
    }
    return result;
  })(Text);

  ReactDom.render(
    <Provider store={ store }>
      <TextComponent />
    </Provider>
    , rootEl
  )
}