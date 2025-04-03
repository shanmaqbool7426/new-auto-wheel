import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const searchApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query({
      query: (searchTerm) => ({
        url: API_ENDPOINTS.SEARCH.GLOBAL,
        method: 'GET',
        params: { q: searchTerm }
      }),
      providesTags: ['SEARCH']
    }),
    getSearchSuggestions: builder.query({
      query: (term) => ({
        url: API_ENDPOINTS.SEARCH.SUGGESTIONS,
        method: 'GET',
        params: { term }
      }),
      providesTags: ['SEARCH']
    })
  })
});

export const { useGlobalSearchQuery, useGetSearchSuggestionsQuery } = searchApi;