import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contentType: null
};

export const flowSidebarSlice = createSlice({
  name: 'flowSidebar',
  initialState,
  reducers: {
    setContentType: (state, action) => {
      state.contentType = action.payload;
    }
  }
});

export const { setContentType } = flowSidebarSlice.actions;
const { reducer: flowSidebarReducer } = flowSidebarSlice;

export { flowSidebarReducer };
