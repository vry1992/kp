import { call, takeEvery, put } from 'redux-saga/effects';
import { POST_UNIT } from '../actions/newUnit';
import { apiPostUnit } from '../services/api';
import { setUnitNames } from '../reducers/initialData';

function* postUnit(action) {
  const { payload, onSuccess, onError } = action;
  try {
    const data = yield call(apiPostUnit, payload);
    yield put(setUnitNames(data));
    if (onSuccess) onSuccess();
  } catch (error) {
    if (onError && error?.response?.data?.message) {
      const {
        response: { data }
      } = error;
      const { message } = data;
      onError(message);
    }
  }
}

function* unitWatcher() {
  yield takeEvery(POST_UNIT, postUnit);
}

export { unitWatcher };
