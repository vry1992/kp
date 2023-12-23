export const aircraftsListSelector = (state) => {
  return state.aircraftReducer.aircraft;
};

export const aircraftsLoaderSelector = (state) => {
  return state.aircraftReducer.loading;
};
