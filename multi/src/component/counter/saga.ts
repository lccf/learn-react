import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export function *incrementAsync(action) {
    yield call(delay, 1000);
    yield put(Object.assign({}, action, {type: 'ACTION_INCREMENT'}));
}

function wrapFunction(dataLabel: string, saga: Function) {
  return function *(action: any) {
    if (action.payload.dataLabel == dataLabel)
      yield *saga(action)
  }
}

export default function (dataLabel: string) {
  return {
    'ACTION_INCREMENT_ASYNC': wrapFunction(dataLabel, incrementAsync)
  }
}