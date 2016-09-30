/// <reference path="./declare.d.ts" />
import { Action, createAction } from 'redux-actions';

export const ACTION_UPDATE = 'ACTION_UPDATE';
export const actionUpdate = createAction(
    ACTION_UPDATE,
    (text: string, dataLabel: string) => ({ text, dataLabel })
);