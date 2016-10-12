/// <reference path="../declare/index.d.ts" />
// import { render as TextRender, default as TextReducer } from './text';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

import use from '../library/use';
import Ndoo from '../library/ndoo_ts';
import Util from './utilService';
import * as Component from '../component';

use(Util);

interface componentParam {
  dataLabel: string,
  componentName: string,
  [key: string]: string,
};

interface componentData extends componentParam {
  elem: any,
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

@Ndoo.Component('common.componentService', Ndoo.RegType.Service, true)
export default class ComponentService {
  /**
   * store对象
   */
  store: Store<{[key: string]: any}>;
  /**
   * reducer配置
   */
  reducerConfig: {[key: string]: any};
  /**
   * 创建组件
   */
  createComponent($components: any) {
    let util = ndoo.service<typeof Util>('common.util');
    let temp: componentData[] = [];
    for (let item of $components) {
      let param = util.formatUrlParam($(item).data('component') || '') as componentParam;
      let label = param.dataLabel;
      label = label.replace('[id]', ndoo.getPk());
      temp.push(Object.assign({}, param, { elem: item, dataLabel: label}));
    }

    this.store = this.createStore(temp);
    this.renderComponent(temp, this.store);
    // console.log(store.getState());
  }
  /**
   * 渲染组件
   */
  renderComponent(config: componentData[], store) {
    for (let item of config) {
      Component.render(item.elem, Component[`${item.componentName}`], store, item.dataLabel);
    }
  }
  /**
   * 创建store
   */
  createStore(config: componentData[]) {
    let reducerConfig: {
      [key: string]: any;
    } = { externalCallback: (state: any, action: any) => state || {} };
    let initialState = {
      externalCallback: Util.externalCallback
    };
    for (let item of config) {
      reducerConfig[item.dataLabel] = Component[item.componentName+'Reducer'](item.dataLabel);
    }
    this.reducerConfig = reducerConfig;
    let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
    let reducer = combineReducers(reducerConfig);
    return createStoreWithMiddleware(reducer, initialState);
  }
  /**
   * 初始化组件
   */
  initComponent(rootEl?: HTMLElement) {
    let $elem = $('[data-component]', rootEl ? rootEl : document.body);
    let $components = $elem.slice(0).filter((item) => {
      let $el = $(item);
      return $el.data('init') == 'inited' ? false : true;
    });
    this.createComponent($components);
  }
  /**
   * 单例入口
   */
  private static _instance: ComponentService;
  static init() {
    if (!this._instance) {
      this._instance = new ComponentService();
    }
    return this._instance;
  }
}