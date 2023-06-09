import { configureStore } from '@reduxjs/toolkit';

import postsReducer from './features/postsSlice';

export const store = configureStore({
  reducer: {
    postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
