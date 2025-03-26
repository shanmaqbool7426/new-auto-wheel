'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
// Import other reducers as needed

const initializeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        token: null,
        isLoggedIn: false,
        user: null,
      }
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable for development if needed
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = initializeStore();

// Optional: Hot reloading setup
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers/authSlice', () => {
    store.replaceReducer(authReducer);
  });
}

