"use client"
import { configureStore } from '@reduxjs/toolkit';
import { BASE_API } from '@/services/base-api';
import locationReducer from './features/location';
export const makeStore = () => {
  return configureStore({
    reducer: {
      [BASE_API.reducerPath]: BASE_API.reducer,
      location: locationReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(BASE_API.middleware),
  })
}