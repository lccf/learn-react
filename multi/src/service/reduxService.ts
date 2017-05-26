import { createStore, combineReducers, applyMiddleware, Store, Reducer, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as Ndoo from 'ndoojs';

import Util from './utilService';

import rootSaga from './sagas';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

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
      // let createStoreWithMiddleware = applyMiddleware(thunk, logger, sagaMiddleware)(createStore);
      // this._store = createStoreWithMiddleware(newReducer, initialState);
      const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
      this._store = createStore(
        newReducer,
        composeEnhancers(
          applyMiddleware(thunk, logger, sagaMiddleware)
        )
      );
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

  static _instance: ReduxService;
  static init() {
    if (!this._instance) {
      this._instance = new ReduxService();
    }
    return this._instance;
  }
}