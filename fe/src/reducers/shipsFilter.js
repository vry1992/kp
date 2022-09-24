import { createSlice } from '@reduxjs/toolkit';
import { getDefaultDateFrom, getDefaultDateTo } from '../helpers';

const initialState = {
  filter: {
    timeTo: { value: '', timeMs: 0 },
    timeFrom: { value: '', timeMs: 0 },
    dateTo: getDefaultDateTo(),
    dateFrom: getDefaultDateFrom()
  }
};

export const shipsFilterSlice = createSlice({
  name: 'shipsFilter',
  initialState,
  reducers: {
    setShipsFilterValues: (state, action) => {
      state.filter = action.payload;
    },
    saveTimeFrom: (state, { payload }) => {
      state.filter.timeFrom = payload;
    },
    saveDateFrom: (state, { payload }) => {
      state.filter.dateFrom = payload;
    },
    saveTimeTo: (state, { payload }) => {
      state.filter.timeTo = payload;
    },
    saveDateTo: (state, { payload }) => {
      state.filter.dateTo = payload;
    }
  }
});

export const { saveTimeFrom, saveDateFrom, saveTimeTo, saveDateTo } = shipsFilterSlice.actions;
export const { reducer: shipsFilterReducer } = shipsFilterSlice;
