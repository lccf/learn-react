/// <reference path="../typings/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// import { model, }
// import { filterRequestModel, reducerModel, externalCallbackModel } from './component/commonFilter/model';
import {
  // action
  actionUpdateFilter,
  actionShowPanel,
  actionHidePanel,
  // reducer
  default as CommonFilterReduces,
  // model
  filterRequestModel,
  externalCallbackModel,
  reducerModel,
  // component
  Filter,
  // util
  updateFilterMiddleware,
  dataTransform,
} from './filter';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

// import data
// import { all as CommonFilterData } from './MockData';
// import util
// import { externalCallback } from './util';
// let initialState = CommonFilterDataTransform(CommonFilterData as filterRequestModel, externalCallback);
// const store = createStoreWithMiddleware(CommonFilterReduces, initialState);
// console.log(initialState);

export default class CommonFilterApp {
  private store;
  private externalCallback;
  constructor(data: filterRequestModel, elem: Element, externalCallback: externalCallbackModel, useLogger: boolean) {
    this.externalCallback = externalCallback;
    const initialState:reducerModel = dataTransform(data, externalCallback);
    let createStoreWithMiddleware;
    if (useLogger) {
      createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
    }
    else {
      createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    }
    const store = this.store = createStoreWithMiddleware(CommonFilterReduces, initialState); 
    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
      elem
    )
  }
  show() {
    this.store.dispatch(actionShowPanel());
  }
  hide() {
    this.store.dispatch(actionHidePanel());
  }
  update(data) {
    const state = dataTransform(data, this.externalCallback);
    this.store.dispatch(actionUpdateFilter(state));
  }
  getState() {
    this.store.getState();
  }
}