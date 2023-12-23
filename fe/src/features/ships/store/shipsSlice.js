import { createSlice } from '@reduxjs/toolkit';
import { getShipsThunk } from './shipsThunk';

const initialState = {
  ships: [],
  loading: []
};

export const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getShipsThunk.fulfilled, (state, action) => {
      state.ships = action.payload;
      state.loading = state.loading.filter((type) => action.type !== type);
    });
    // builder.addCase(getShipsThunk.pending, (state) => {
    //   console.log(state.loading);
    //   // state.loading = state.loading.push(action.type);
    // });
    builder.addCase(getShipsThunk.rejected, (state, action) => {
      state.loading = state.loading.filter((type) => action.type !== type);
    });
  }
});

const { reducer: shipsReducer } = shipsSlice;

export { shipsReducer };
