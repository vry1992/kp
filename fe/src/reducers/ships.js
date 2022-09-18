import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchShipsList: [],
  shipsFilter: []
};

export const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setSearchShipsList: (state, { payload }) => {
      state.searchShipsList = payload;
    },
    setShipsFilter: (state, { payload }) => {
      state.shipsFilter = payload;
    }
  }
});

export const { setSearchShipsList, setShipsFilter } = shipsSlice.actions;
const { reducer: shipsReducer } = shipsSlice;

export { shipsReducer };
