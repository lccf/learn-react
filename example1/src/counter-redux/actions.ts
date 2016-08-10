/// <reference path="../../typings/index.d.ts" />
import { Action, createAction } from 'redux-actions';

export const ACTION_INCREMENT = 'ACTION_INCREMENT';
export const actionIncrement = createAction(
    ACTION_INCREMENT
);

export const ACTION_DECREMENT = 'ACTION_DECREMENT';
export const actionDecrement = createAction(
    ACTION_DECREMENT
);

export const actionSyncIncrement = () => (dispatch: any) => {
    setTimeout(
        () => dispatch(actionIncrement()),
    1000);
} 