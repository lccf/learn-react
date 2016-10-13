/// <reference path="./declare.d.ts" />
import { Action, createAction } from 'redux-actions';

export const ACTION_INCREMENT = 'ACTION_INCREMENT';
export const actionIncrement = createAction( ACTION_INCREMENT, (dataLabel: string) => ({ dataLabel}) );

export const ACTION_DECREMENT = 'ACTION_DECREMENT';
export const actionDecrement = createAction( ACTION_DECREMENT, (dataLabel: string) => ({ dataLabel}) );

export const ACTION_INCREMENT_ASYNC = 'ACTION_INCREMENT_ASYNC';
export const actionIncrementAsync = createAction( ACTION_INCREMENT_ASYNC, (dataLabel: string) => ({ dataLabel }));