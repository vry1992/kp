export const shipsDataListSelector = (state) => {
  return state.shipsDataReducer.shipsData;
};

export const shipsDataListLoading = (state) => {
  return state.shipsDataReducer.loading;
};
