/// <reference path="../declare/index.d.ts" />
import { createStore, combineReducers, applyMiddleware, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';

import Ndoo from '../library/ndoo_ts';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

@Ndoo.Component('common.reduxService', Ndoo.RegType.Service, true)
export default class ReduxService {
  /**
   * 全局store对象
   */
  private _store: Store<{ [key: string]: any }>;
  get store() {
    return this._store
  }

  /**
   * 全局reducer配置
   */
  private _reducerConfig: { [key: string]: any } = {};
  get reducerConfig() {
    return this._reducerConfig;
  }

  /**
   * 更新reducer
   * 
   * @param key 处理的key 
   * @param reducer 处理的函数
   * @param overwrite 是否重写
   */
  addReducer(key: string, reducer:Function, overwrite: boolean = false) {
    if (!this.hasReducer(key) || overwrite) {
      this._reducerConfig[key] = reducer;
    }
    
    let newReducer = combineReducers(this._reducerConfig);
    if (!this._store) {
      let initialState = {};
      let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
      this._store = createStoreWithMiddleware(newReducer, initialState);
    }
    else {
      this._store.replaceReducer(newReducer);
    }
    return this._store;
  }

  // updateReducerByCallback(callback) {
  //   let {store, reducerConfig} = callback(this.store, this.reducerConfig);
  // }

  /**
   * 判断reducer中是否有指定的key
   */
  hasReducer(key) {
    return this._reducerConfig[key];
  }

  static _instance: ReduxService;
  static init() {
    if (!this._instance) {
      this._instance = new ReduxService();
    }
    return this._instance;
  }
}