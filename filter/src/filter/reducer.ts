import { combineReducers } from 'redux';
import { Action, handleActions } from 'redux-actions';
import assign = require('object-assign');

import {
  ACTION_SHOW_PANEL,
  ACTION_HIDE_PANEL,
  ACTION_SHOW_CATE,
  ACTION_HIDE_CATE,
  ACTION_SHOW_FILTER,
  ACTION_HIDE_FILTER,
  ACTION_EXPAND_CATE,
  ACTION_RESET,
  ACTION_OK,
  ACTION_UPDATE_FILTER,
 } from './actions';
import { cate, cateModel, filterItemModel, reducerModel } from './model';

// const assign = (...args) => _.assign.apply(_, args);

// const getState = state => state;
export default combineReducers({
  uiControl: combineReducers({
    visible: handleActions({
      [ACTION_OK]: (state: any, action: Action<any>) => false,
      [ACTION_SHOW_PANEL]: (state: any, action: Action<any>) => true,
      [ACTION_HIDE_PANEL]: (state: any, action: Action<any>) => false,
    }, false),
    showPanel: handleActions({
      [ACTION_SHOW_CATE]: (state: any, action: Action<any>) => !action.payload.showCate,
      [ACTION_HIDE_CATE]: (state: any, action: Action<any>) => true,
      [ACTION_SHOW_FILTER]: (state: any, action: Action<any>) => false,
      [ACTION_HIDE_FILTER]: (state: any, action: Action<any>) => true,
      [ACTION_UPDATE_FILTER]: (state: any, action: Action<any>) => true,
    }, true),
    expand: handleActions({
      [ACTION_SHOW_FILTER]: (state: any, action: Action<any>) => action.payload.code,
      [ACTION_HIDE_FILTER]: (state: any, action: Action<any>) => '',
      [ACTION_UPDATE_FILTER]: (state: any, action: Action<any>) => '',
    }, ''),
  }),
  data: combineReducers({
    cate: handleActions({
      [ACTION_SHOW_CATE]: (state: any, action: Action<any>) => assign({}, state, {visible: action.payload.showCate}), 
      [ACTION_HIDE_CATE]: (state: any, action: Action<any>) => assign({}, state, {visible: false, expandCateId: []}),
      [ACTION_EXPAND_CATE]: (state: any, action: Action<any>) => {
        // let expandCateId: string[] = state.expandCateId;
        let expandCateId: string[] = state.expandCateId.filter( item => item != action.payload.cateId )
        // 如果没有展开
        if (expandCateId.length == state.expandCateId.length) {
          // 判断是否有级别互斥
          expandCateId.splice(action.payload.level - 1);
          expandCateId.push( action.payload.cateId.toString() );
        }
        return assign({}, state, { expandCateId });
      },
      // 更新筛选面板
      [ACTION_UPDATE_FILTER]: (state: any, action: Action<any>) => {
        let expandCateId: string[] = state.expandCateId;
        let crumb = action.payload.data.crumb;
        if (crumb.length) {
          expandCateId = crumb.slice(1, crumb.length).map( item => item.catId);
        }
        return assign({}, action.payload.data.cate, {visible: false, expandCateId});
      }
    }, {}),
    crumb: handleActions({
      ACTION_UPDATE_FILTER: (state: any, action: Action<any>) => {
        let crumbItems = action.payload.data.crumb;
        return [...crumbItems];
      },
    }, {}),
    others: handleActions({
      [ACTION_SHOW_FILTER]: (state: any, action: Action<any>) => {
        state = state.map((item: filterItemModel) => {
          if (item.data.code == action.payload.code) {
            item.visible = true;
          }
          else {
            item.visible = false;
          }
          return item;
        })
        return [...state];
      },
      [ACTION_UPDATE_FILTER]: (state: any, action: Action<any>) => {
        state = action.payload.data.others.map((item: filterItemModel) => {
          item.visible = false;
          return item;
        });
        return [...state];
      },
    }, []),
    request: handleActions({
      [ACTION_UPDATE_FILTER]: (state: any, action: Action<any>) => {
        return assign({}, action.payload.data.request);
      }
    }, {}),
  }),
  externalCallback: (state: any, action: any) => state || {},
});
