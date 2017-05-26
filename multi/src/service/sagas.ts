import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export function *incrementAsync(action) {
    // debugger;
    yield call(delay, 1000);
    // yield put({type: 'ACTION_INCREMENT'});
    yield put(Object.assign({}, action, {type: 'ACTION_INCREMENT'}));
}

export default function *rootSaga() {
    yield *takeEvery('ACTION_INCREMENT_ASYNC', incrementAsync);
}