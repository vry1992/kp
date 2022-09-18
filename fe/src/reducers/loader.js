import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actions: {}
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    addLoaderAction: (state, { payload: { action } }) => {
      state.actions[action] = action;
    },
    deleteLoaderAction: (state, { payload: { action } }) => {
      delete state.actions[action];
    }
  }
});

export const { addLoaderAction, deleteLoaderAction } = loaderSlice.actions;
const { reducer: loaderReducer } = loaderSlice;

export { loaderReducer };
