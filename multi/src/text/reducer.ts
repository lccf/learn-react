/// <reference path="./declare.d.ts" />
import { combineReducers } from 'redux';
import { Action, handleActions } from 'redux-actions';

import {
    ACTION_UPDATE
} from './actions';

// export default combineReducers({
//     data: combineReducers({
//         text: handleActions<string, any>({
//             [ACTION_UPDATE]: (state: string, action: Action<any>) => action.payload.text
//         })
//     })
// })

// export default handleActions<string, any>({
//     [ACTION_UPDATE]: (state: string, action: Action<any>) => action.payload.text
// }, '');

export default (position: string) => handleActions<string, any>({
    [ACTION_UPDATE]: (state: string, action: Action<any>) => action.payload.position == position ? action.payload.text : state
}, '')
