import { createAsyncThunk } from '@reduxjs/toolkit';
import { ShipsDataService } from '../services/ShipsDataService';

const postShipsDataThunk = createAsyncThunk('shipsData/post-data', async (body) => {
  try {
    const shipData = await ShipsDataService.postShipData(body);
    return shipData;
  } catch (error) {
    return {};
  }
});

const filterShipsDataThunk = createAsyncThunk('shipsData/filter', async (body) => {
  try {
    const shipsData = await ShipsDataService.filterShipsData(body);
    return shipsData;
  } catch (error) {
    return [];
  }
});

export { postShipsDataThunk, filterShipsDataThunk };
