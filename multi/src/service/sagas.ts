import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export default function createRootSaga(sagas: any) {
    function *dispatchSaga(action: any) {
        let sagaItems: any[] = sagas[action.type];
        if (sagaItems && sagaItems.length) {
            for(let saga of sagaItems) {
                yield *saga(action);
            }
        }
    }

    // 全局监听
    return function *rootSaga() {
        yield *takeEvery('*', dispatchSaga);
    }
}