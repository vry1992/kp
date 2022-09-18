import { all } from 'redux-saga/effects';
import { unitWatcher } from './unit';
import { initWatcher } from './init';
import { shipsWatcher } from './ships';

export default function* rootSaga() {
  yield all([unitWatcher(), initWatcher(), shipsWatcher()]);
}
