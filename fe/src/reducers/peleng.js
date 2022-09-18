import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPelengationPanelOpen: false,
  pelengsCounter: 0,
  currentPeleng: {},
  pelengsToDraw: []
};

export const pelengSlice = createSlice({
  name: 'peleng',
  initialState,
  reducers: {
    setPelengationPanelState: (state) => {
      state.isPelengationPanelOpen = !state.isPelengationPanelOpen;
    },
    addStartPelengPoint: (state, action) => {
      state.currentPeleng = { ...action.payload };
    },
    addPelengToDraw: (state, action) => {
      state.pelengsToDraw[state.pelengsCounter] = { ...state.currentPeleng, ...action.payload };
      state.pelengsCounter = state.pelengsCounter + 1;
      state.currentPeleng = {};
    }
  }
});

export const { setPelengationPanelState, addStartPelengPoint, addPelengToDraw } =
  pelengSlice.actions;
const { reducer: pelengReducer } = pelengSlice;

export { pelengReducer };
