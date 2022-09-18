import { call, all, put } from 'redux-saga/effects';
import { INIT_ACTION } from '../actions/init';
import { apiGetInit } from '../services/api';
import { addLoaderAction, deleteLoaderAction } from '../reducers/loader';
import { setInitData } from '../reducers/initialData';

function* getInit(action = INIT_ACTION) {
  try {
    yield put(addLoaderAction({ action }));
    const initData = yield call(apiGetInit);
    yield put(setInitData(initData));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(deleteLoaderAction({ action }));
  }
}

function* initWatcher() {
  yield all([call(getInit)]);
}

export { initWatcher };
