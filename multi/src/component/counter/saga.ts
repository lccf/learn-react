import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export function *incrementAsync(action) {
    yield call(delay, 1000);
    yield put(Object.assign({}, action, {type: 'ACTION_INCREMENT'}));
}

export function *counterIncrementAsync(action: any) {
  yield *incrementAsync(action);
}

export default function (dataLabel: string) {
  return {
    'ACTION_INCREMENT_ASYNC': function *(action: any) {
      if (action.payload.dataLabel == dataLabel) {
        yield *incrementAsync(action);
      }
    }
  }
  // return function *(action: any) {
  //   if (action.type == 'ACTION_INCREMENT_ASYNC' && action.payload.dataLabel == dataLabel) {
  //     yield *incrementAsync(action);
  //   }
  // }
}