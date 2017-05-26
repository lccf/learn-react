import { combineReducers } from 'redux';
import { Action, handleActions } from 'redux-actions';

import {
    ACTION_INCREMENT,
    ACTION_DECREMENT,
} from './actions';

export default (dataLabel: string) => combineReducers({
    count: handleActions<number, Action<any>>({
      [ACTION_INCREMENT]: (state: number, action: Action<any>) => action.payload.dataLabel == dataLabel ? state+1 : state,
      [ACTION_DECREMENT]: (state: number, action: Action<any>) => action.payload.dataLabel == dataLabel ? state-1 : state,
    }, 0)
});