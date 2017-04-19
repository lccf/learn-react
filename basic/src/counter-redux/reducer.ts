import { combineReducers } from 'redux';
import { Action, handleActions } from 'redux-actions';

import {
    ACTION_INCREMENT,
    ACTION_DECREMENT,
    actionIncrement,
    actionDecrement
} from './actions';

export default combineReducers({
    count: handleActions<number, any>({
        [ACTION_INCREMENT]: (state: number, action: Action<any>) => state + 1,
        [ACTION_DECREMENT]: (state: number, action: Action<any>) => state - 1
    }, 0)
});