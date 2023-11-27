import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import {
  DELETE_SHIP_DATA_ITEM,
  EDIT_SHIP_DATA,
  GET_SHIP_INFO_BY_ID,
  POST_FILTER_SHIPS,
  POST_SEARCH_SHIP_KEYWORD,
  POST_SHIP,
  POST_SHIP_DATA
} from '../actions/ships';
import { setInitData } from '../reducers/initialData';
import {
  setSearchShipsList,
  setShipEditData,
  setShipsFilter,
  setShipUpdateData
} from '../reducers/ships';
import {
  apiEditShipData,
  apiFilterShipsData,
  apiPostSearchShipKeyword,
  apiPostShip,
  apiPostShipData,
  deleteShipData,
  getShipInfoById
} from '../services/api';
import { SEARCH_KEY } from '../constants/searchForm';
import { DUTY_INFO_STORAGE_KEY } from '../pages/DutyInfo';

function* postShip(action) {
  const { payload, onSuccess, onError } = action;
  try {
    yield call(apiPostShip, payload);
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

function* searchShipByKeyWord(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostSearchShipKeyword, payload.data);
    if (result.length) {
      yield put(setSearchShipsList(result));
    } else {
      payload.onError();
      yield put(setSearchShipsList([]));
    }
  } catch (error) {
    console.error(error);
  }
}

function* saveShipData(action) {
  const {
    payload: { data, onSuccess, onError }
  } = action;
  try {
    const result = yield call(apiPostShipData, data);
    yield put(setInitData(result));
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    if (onError) {
      onError();
    }
    console.log(error);
  }
}

function* filterShips(action) {
  const {
    payload: { data, onSuccess, onError }
  } = action;
  try {
    const filterResult = yield call(apiFilterShipsData, data);
    yield put(setShipsFilter(filterResult));
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    if (onError) {
      onError();
    }
    console.log(error);
  }
}

function* deleteShipDataItem(action) {
  try {
    yield call(deleteShipData, action.payload);
    const filtersString = localStorage.getItem(SEARCH_KEY);
    if (filtersString) {
      const filters = JSON.parse(filtersString);
      yield call(filterShips, {
        payload: {
          data: {
            ...filters,
            dateTo: new Date(filters.dateTo).getTime(),
            dateFrom: new Date(filters.dateFrom).getTime(),
            shipNameList: filters.shipNameList.map(({ key }) => key)
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getShipInfo({ payload }) {
  const { id } = payload;
  const data = yield call(getShipInfoById, id);
  yield put(setShipEditData(data));
}

function* editShipData(action) {
  const {
    payload: { data, onSuccess, onError }
  } = action;
  try {
    const storageData = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
    const dutyData = storageData ? JSON.parse(storageData) : null;
    if (!data.personEditName) {
      data.personEditName = dutyData?.dutyManFullName;
    }
    const result = yield call(apiEditShipData, data);
    yield put(setShipUpdateData(result));
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    if (onError) {
      onError();
    }
    console.log(error);
  }
}

function* shipsWatcher() {
  yield takeEvery(POST_SHIP, postShip);
  yield takeEvery(POST_SHIP_DATA, saveShipData);
  yield takeLatest(POST_SEARCH_SHIP_KEYWORD, searchShipByKeyWord);
  yield takeEvery(POST_FILTER_SHIPS, filterShips);
  yield takeEvery(DELETE_SHIP_DATA_ITEM, deleteShipDataItem);
  yield takeEvery(GET_SHIP_INFO_BY_ID, getShipInfo);
  yield takeEvery(EDIT_SHIP_DATA, editShipData);
}

export { shipsWatcher };
