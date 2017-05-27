// import { render as TextRender, default as TextReducer } from './text';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import * as Ndoo from 'ndoojs';

import use from '../library/use';
import Util from './utilService';
import compose from '../library/compose';
import * as Component from '../component';

import logger from '../library/logger';

use(Util);
let ndoo = Ndoo;

interface componentParam {
  dataLabel: string,
  componentName: string,
  [key: string]: string,
};

interface componentData extends componentParam {
  elem: any,
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
    let labelArr: any[] = [];
    for (let item of $components) {
      let param = util.formatUrlParam($(item).data('component') || '') as componentParam;
      let label = param.dataLabel;
      label = label.replace('[id]', ndoo.getPk());
      temp.push(Object.assign({}, param, { elem: item, dataLabel: label}));
      labelArr.push(Component[`${param.componentName}Load`]());
    }
    Promise.all(labelArr).then((components: any) => {
      let componentHandle = Object.assign.apply(null,  [{}].concat(components));
      this.store = this.createStore(temp, componentHandle);
      this.renderComponent(temp, this.store, componentHandle);
    });
  }
  /**
   * 渲染组件
   */
  renderComponent(config: componentData[], store, componentHandle: any) {
    for (let item of config) {
      Component.render(item.elem, componentHandle[`${item.componentName}`], store, item.dataLabel);
    }
  }
  /**
   * 创建组件项
   * @param config 
   * @param store 
   */
  renderComponentItem(config: componentData[], store) {

  }
  /**
   * 创建store
   */
  createStore(config: componentData[], componentHandle: any) {
    let reducerConfig: {
      [key: string]: any;
    } = { externalCallback: (state: any, action: any) => state || {} };
    let initialState = {
      externalCallback: Util.externalCallback
    };
    for (let item of config) {
      reducerConfig[item.dataLabel] = componentHandle[item.componentName+'Reducer'](item.dataLabel);
    }
    this.reducerConfig = reducerConfig;
    let reducer = combineReducers(reducerConfig);
    // let createStoreWithMiddleware = applyMiddleware(thunk, logge
    return createStore(
      reducer,
      compose(
        applyMiddleware(thunk, logger)
      )
    );
  }
  /**
   * 初始化组件
   */
  initComponent(rootEl?: HTMLElement) {
    let $elem = $('[data-component]', rootEl || document.body);
    let $components = $elem.get().filter((item) => {
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