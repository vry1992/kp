import { createAsyncThunk } from '@reduxjs/toolkit';
import { ShipService } from '../services/ShipsService';

const getShipsThunk = createAsyncThunk('ships/get-all', async () => {
  try {
    const ships = await ShipService.getShips();
    return ships;
  } catch (error) {
    return [];
  }
});

export { getShipsThunk };
