import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const comparisonApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    addComparison: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.COMPARISON.ADD,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['COMPARISON']
    }),

    getComparison: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.COMPARISON.GET,
        method: 'GET',
        params
      }),
      providesTags: ['COMPARISON']
    }),

    getComparisonList: builder.query({
      query: () => ({
        url: API_ENDPOINTS.COMPARISON.COMPARISON_LIST,
        method: 'GET'
      }),
      providesTags: ['COMPARISON']
    }),

    getTopComparison: builder.query({
      query: () => ({
        url: API_ENDPOINTS.COMPARISON.TOP_COMPARISON,
        method: 'GET'
      }),
      providesTags: ['COMPARISON']
    })
  })
});

export const {
  useAddComparisonMutation,
  useGetComparisonQuery,
  useGetComparisonListQuery,
  useGetTopComparisonQuery
} = comparisonApi;