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
      state.loading = {
        ...state.loading,
        [action.type.replace('/fulfilled', '')]: false
      };
    });
    builder.addCase(getShipsThunk.pending, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/pending', '')]: true
      };
    });
    builder.addCase(getShipsThunk.rejected, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/rejected', '')]: false
      };
    });
  }
});

const { reducer: shipsReducer } = shipsSlice;

export { shipsReducer };
