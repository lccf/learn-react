/// <reference path="./declare/index.d.ts" />
// import { render as TextRender, default as TextReducer } from './text';
// import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
// import thunk from 'redux-thunk';

// const logger = store => next => action => {
//   console.log('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }

// const headerTextEl = $('#headerText').get(0);
// const footerTextEl = $('#footerText').get(0);

// let reducer = combineReducers({
//     headerText: TextReducer('headerText'),
//     footerText: TextReducer('footerText')
// });

// let initialState = {
//     headerText: 'headerText',
//     footerText: 'footerText',
// }

// let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
// let store = createStoreWithMiddleware(reducer, initialState);

// console.log(store.getState());

// TextRender(headerTextEl, store, 'headerText');
// TextRender(footerTextEl, store, 'footerText');

// const use = (...app: any[]): void => { return; };
import use from './library/use';
import * as Block from './block';
// import * as Service from './service';
use(Block);

// render(rootEl);