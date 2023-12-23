import { createSlice } from '@reduxjs/toolkit';
import { filterAircraftThunk } from './aircraftThunk';

const initialState = {
  aircraft: [],
  loading: {}
};

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(filterAircraftThunk.fulfilled, (state, action) => {
      state.aircraft = action.payload;
      state.loading = {
        ...state.loading,
        [action.type.replace('/fulfilled', '')]: false
      };
    });
    builder.addCase(filterAircraftThunk.pending, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/pending', '')]: true
      };
    });
    builder.addCase(filterAircraftThunk.rejected, (state, action) => {
      state.loading = {
        ...state.loading,
        [action.type.replace('/rejected', '')]: false
      };
    });
  }
});

const { reducer: aircraftReducer } = aircraftSlice;

export { aircraftReducer };
