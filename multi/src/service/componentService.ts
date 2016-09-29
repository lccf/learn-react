/// <reference path="../declare/index.d.ts" />
// import { render as TextRender, default as TextReducer } from './text';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

import use from '../library/use';
import Ndoo from '../library/ndoo_ts';
import Util from './utilService';
import * as Component from '../component';

use(Util);

@Ndoo.Component('common.componentService', Ndoo.RegType.Service, true)
export default class ComponentService {
  constructor() {

  }
  commit($components: any) {
    let util = ndoo.service<typeof Util>('common.util');
    let temp: {
      elem: any,
      dataLabel: string,
      component: string,
      param: { [key: string]: string },
    }[] = [];
    for (let item of $components) {
      let param:{
        dataLabel?: string,
        component?: string,
        [key: string]: string,
      } = util.formatUrlParam($(item).data('config') || '');
      let label = param.dataLabel;
      label = label.replace('[id]', ndoo.getPk());
      temp.push({
        elem: item,
        dataLabel: label,
        component: param.component,
        param: param
      });
    }

    let store = this.createStore(temp);
    this.createComponent(temp, store);
    // console.log(store.getState());
  }
  createComponent(config, store) {
    for (let item of config) {
      Component[`${item.component}Render`](item.elem, store, item.dataLabel);
    }
  }
  createStore(config) {
    let reducerConfig: {
      [key: string]: any;
    } = {};
    let initialState = {};
    const logger = store => next => action => {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
    for (let item of config) {
      reducerConfig[item.dataLabel] = Component[item.component+'Reducer'](item.dataLabel);
    }
    let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
    let reducer = combineReducers(reducerConfig);
    return createStoreWithMiddleware(reducer, initialState);
  }
  scan(rootEl?: HTMLElement) {
    let $elem = $('[data-react-component]', rootEl ? rootEl : document.body);
    let $components = $elem.slice(0).filter((item) => {
      let $el = $(item);
      return $el.data('init') == 'inited' ? false : true;
    });
    this.commit($components);
  }
  static _instance: ComponentService;
  static init() {
    if (!this._instance) {
      this._instance = new ComponentService();
    }
    return this._instance;
  }
}