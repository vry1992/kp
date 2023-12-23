import { createAsyncThunk } from '@reduxjs/toolkit';
import { AircraftService } from '../services/AircraftService';

const filterAircraftThunk = createAsyncThunk('aircraft/filter', async (body) => {
  try {
    const aircrafts = await AircraftService.filterData(body);
    return aircrafts;
  } catch (error) {
    return [];
  }
});

export { filterAircraftThunk };
