export const POST_SHIP = 'POST_SHIP';
export const POST_SEARCH_SHIP_KEYWORD = 'POST_SEARCH_SHIP_KEYWORD';
export const POST_SHIP_DATA = 'POST_SHIP_DATA';
export const POST_FILTER_SHIPS = 'POST_FILTER_SHIPS';
export const DELETE_SHIP_DATA_ITEM = 'DELETE_SHIP_DATA_ITEM';
export const GET_SHIP_INFO_BY_ID = 'GET_SHIP_INFO_BY_ID';
export const EDIT_SHIP_DATA = 'EDIT_SHIP_DATA';

export const getShipInfoByIdAction = (payload) => {
  return {
    type: GET_SHIP_INFO_BY_ID,
    payload
  };
};

export const editShipData = (payload, onSuccess, onError) => {
  return {
    type: EDIT_SHIP_DATA,
    payload,
    onSuccess,
    onError
  };
};

export const postShip = (payload, onSuccess, onError) => {
  return {
    type: POST_SHIP,
    payload,
    onSuccess,
    onError
  };
};

export const deleteShipItemData = (payload, onSuccess, onError) => {
  return {
    type: DELETE_SHIP_DATA_ITEM,
    payload,
    onSuccess,
    onError
  };
};

export const postSearchShipKeyWord = (payload) => {
  return {
    type: POST_SEARCH_SHIP_KEYWORD,
    payload
  };
};

export const postShipData = (payload) => {
  return {
    type: POST_SHIP_DATA,
    payload
  };
};

export const filterShips = (payload) => {
  return {
    type: POST_FILTER_SHIPS,
    payload
  };
};
