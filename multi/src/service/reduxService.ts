import { createStore, combineReducers, applyMiddleware, Store, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as Ndoo from 'ndoojs';

import Util from './utilService';
import createRootSaga from './sagas';
import compose from '../library/compose';
import logger from '../library/logger';

const sagaMiddleware = createSagaMiddleware();

@Ndoo.Component('common.reduxService', Ndoo.RegType.Service, true)
export default class ReduxService {
  /**
   * 全局store对象
   */
  private _store: Store<{ [key: string]: any }>;
  get store() {
    return this._store
  }

  private _saga: { [key: string]: any } = {};
  get saga() {
    return this._saga;
  }

  /**
   * 全局reducer配置
   */
  private _reducerConfig: { [key: string]: any } = { externalCallback: (state: any, action: any) => state || {} };
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
      let initialState = {
        externalCallback: Util.externalCallback
      };
      this._store = createStore(
        newReducer,
        compose(
          applyMiddleware(thunk, logger, sagaMiddleware)
        )
      );
      let saga = this.saga;
      let rootSaga = createRootSaga(saga);
      sagaMiddleware.run(rootSaga);
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

  /**
   * 添加saga到集合中
   */
  addSaga(sagas: any) {
    let _saga = this._saga;
    for (let action in sagas) {
      let saga = sagas[action];
      if (_saga[action]) {
        _saga[action].push(saga);
      }
      else {
        _saga[action] = [saga];
      }
    }
    return this._saga;
    // return this._saga.push(saga);
  }

  static _instance: ReduxService;
  static init() {
    if (!this._instance) {
      this._instance = new ReduxService();
    }
    return this._instance;
  }
}