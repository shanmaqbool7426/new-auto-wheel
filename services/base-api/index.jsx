import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants/api-endpoints';
import { PROVIDES_TAGS } from '../providesTags';

// Create a custom base query with retry logic
const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
    })

export const BASE_API = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: PROVIDES_TAGS,
  endpoints: () => ({})
});

// Enhanced API for global endpoint modifications
export const enhancedApi = BASE_API.enhanceEndpoints({
  endpoints: () => ({}),
  addTagTypes: PROVIDES_TAGS,
  // You can add global endpoint modifications here
  // For example:
  // defaultOptions: {
  //   queries: {
  //     refetchOnMountOrArgChange: true
  //   }
  // }
});