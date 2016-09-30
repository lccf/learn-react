/// <reference path="./declare.d.ts" />
import { combineReducers } from 'redux';
import { Action, handleActions } from 'redux-actions';

import {
  ACTION_UPDATE
} from './actions';

export default (dataLabel: string) => combineReducers({
  text: handleActions<string, any>({
    [ACTION_UPDATE]: (state: string, action: Action<any>) => action.payload.dataLabel == dataLabel ? action.payload.text : state
  }, '')
})
