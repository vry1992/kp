import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchShipsList: [],
  shipsFilter: [],
  editShipData: {
    data_id: '',
    discover_timestamp: 0,
    latitude: 0,
    longitude: 0,
    peleng: 0,
    person_who_added: '',
    create_timestamp: 0,
    person_who_edited: null,
    edit_timestamp: null,
    additional_information: '',
    fk_ship_data_id: '',
    ship_callsign: '',
    companion_callsign: '',
    frequency: '',
    is_deleted: false
  }
};

export const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setSearchShipsList: (state, { payload }) => {
      state.searchShipsList = payload;
    },
    setShipsFilter: (state, { payload }) => {
      state.shipsFilter = payload;
    },
    setShipEditData: (state, { payload }) => {
      state.editShipData = payload;
    }
  }
});

export const { setSearchShipsList, setShipsFilter, setShipEditData } = shipsSlice.actions;
const { reducer: shipsReducer } = shipsSlice;

export { shipsReducer };
