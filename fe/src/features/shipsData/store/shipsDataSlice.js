import { createSlice } from '@reduxjs/toolkit';
import { filterShipsDataThunk, postShipsDataThunk } from './shipsDataThunk';

const initialState = {
  shipsData: [],
  loading: {}
};

export const shipsDataSlice = createSlice({
  name: 'shipsData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(postShipsDataThunk.fulfilled, (state, action) => {
      state.shipsData = state.shipsData.push(action.payload);
      state.loading = {
        ...state.loading,
        [action.type.replace('/fulfilled', '')]: false
      };
    });
    builder.addCase(postShipsDataThunk.pending, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/pending', '')]: true
      };
    });
    builder.addCase(postShipsDataThunk.rejected, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/rejected', '')]: false
      };
    });
    builder.addCase(filterShipsDataThunk.fulfilled, (state, action) => {
      state.shipsData = action.payload;
      state.loading = {
        ...state.loading,
        [action.type.replace('/fulfilled', '')]: false
      };
    });
    builder.addCase(filterShipsDataThunk.pending, (state, action) => {
      console.log(action);
      state.loading = {
        ...state.loading,
        [action.type.replace('/pending', '')]: true
      };
    });
    builder.addCase(filterShipsDataThunk.rejected, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/rejected', '')]: false
      };
    });
  }
});

const { reducer: shipsDataReducer } = shipsDataSlice;

export { shipsDataReducer };
