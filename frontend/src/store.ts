import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers/rootReducer';

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
