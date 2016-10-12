/// <reference path="../declare/index.d.ts" />
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider, connect } from 'react-redux';

export * from './text';
export * from './counter';

export const render = function (rootEl: HTMLElement, component: any, store: any, dataLabel: string): void {
  let Component = connect((state: any) => ({
    data: state[dataLabel],
    externalCallback: state['externalCallback'],
    dataLabel
  }))(component);

  ReactDom.render(
    <Provider store={ store }>
      <Component />
    </Provider>
    , rootEl
  )
}