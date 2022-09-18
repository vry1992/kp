import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unitNames: [],
  personsWhoAdded: [],
  callSigns: [],
  shipNames: []
};

export const initialDataSlice = createSlice({
  name: 'initialData',
  initialState,
  reducers: {
    setInitData: (state, { payload }) => {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    setUnitNames: (state, { payload }) => {
      state.unitNames = payload;
    }
  }
});

export const { setInitData, setUnitNames } = initialDataSlice.actions;
const { reducer: initialDataReducer } = initialDataSlice;

export { initialDataReducer };
