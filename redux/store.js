'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import locationReducer from './reducers/locationSlice';
import { BASE_API } from '@/api-services/base-api';
// Import other reducers as needed

const initializeStore = () => {
  return configureStore({
    reducer: {
      [BASE_API.reducerPath]: BASE_API.reducer,
      auth: authReducer,
      location: locationReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(BASE_API.middleware),
  
  });
};

export const store = initializeStore();

// Optional: Hot reloading setup
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers/authSlice', () => {
    store.replaceReducer(authReducer);
  });
}

// "use client"
// import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from './features/counter/slice';
// import { BASE_API } from '@/services/base-api';

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       [BASE_API.reducerPath]: BASE_API.reducer,
//       counter: counterSlice,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(BASE_API.middleware),
//   })
// }