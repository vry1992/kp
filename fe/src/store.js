import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './reducers';

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export { store };
