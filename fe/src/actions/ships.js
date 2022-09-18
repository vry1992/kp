export const POST_SHIP = 'POST_SHIP';
export const POST_SEARCH_SHIP_KEYWORD = 'POST_SEARCH_SHIP_KEYWORD';
export const POST_SHIP_DATA = 'POST_SHIP_DATA';
export const POST_FILTER_SHIPS = 'POST_FILTER_SHIPS';

export const postShip = (payload, onSuccess, onError) => {
  return {
    type: POST_SHIP,
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
