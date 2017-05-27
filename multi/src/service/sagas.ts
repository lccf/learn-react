import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

// export function *incrementAsync(action) {
//     // debugger;
//     yield call(delay, 1000);
//     // yield put({type: 'ACTION_INCREMENT'});
//     yield put(Object.assign({}, action, {type: 'ACTION_INCREMENT'}));
// }

// export function *dispatchSaga(action: any) {
//     if (action.type == 'ACTION_INCREMENT_ASYNC') {
//         yield *incrementAsync(action);
//     }
// }

// export default function *rootSaga() {
//     yield *takeEvery('*', dispatchSaga);
// }

export default function createRootSaga(sagas: any) {
    // saga 异步分发函数
    // function *dispatchSaga(action: any) {
    //     for (let saga of sagas) {
    //         yield *saga(action);
    //     }
    // }
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