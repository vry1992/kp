import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: {
    personNameList: [],
    shipNameList: [],
    shipCallsignList: [],
    dateTo: 0,
    dateFrom: 0
  }
};

export const shipsFilterSlice = createSlice({
  name: 'shipsFilter',
  initialState,
  reducers: {
    setShipsFilterValues: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setShipsFilterValues } = shipsFilterSlice.actions;
export const { reducer: shipsFilterReducer } = shipsFilterSlice;
