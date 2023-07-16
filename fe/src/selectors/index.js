export const getIsPelengationPanelReady = ({ pelengReducer }) =>
  pelengReducer.isPelengationPanelOpen;
export const getCurrentPeleng = ({ pelengReducer }) => pelengReducer.currentPeleng;
export const getPelengsAmount = ({ pelengReducer }) => pelengReducer.pelengsCounter;
export const getPelengsToDraw = ({ pelengReducer }) => pelengReducer.pelengsToDraw;

export const isLoading = ({ loaderReducer }) => Object.keys(loaderReducer.actions).length;

export const getUnitNames = ({ initialDataReducer }) => initialDataReducer.unitNames;
export const getShipNamesOptions = ({ initialDataReducer: { shipNames } }) => shipNames;
export const getCallSignsOptions = ({ initialDataReducer: { callSigns } }) => callSigns;
export const getPersonsWhoAddedOptions = ({ initialDataReducer: { personsWhoAdded } }) =>
  personsWhoAdded;
export const getSearchShipsList = ({ shipsReducer }) => shipsReducer.searchShipsList;
export const getFilterShipData = ({ shipsReducer }) => shipsReducer.shipsFilter;
export const getShipEditData = ({ shipsReducer }) => shipsReducer.editShipData;

export const getFlowSidebarContentType = ({ flowSidebarReducer }) => flowSidebarReducer.contentType;
export const getShipsFilterValues = ({ shipsFilterReducer }) => shipsFilterReducer.filter;
