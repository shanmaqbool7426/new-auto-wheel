import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const colorApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => ({
        url: API_ENDPOINTS.COLOR.LIST,
        method: 'GET'
      }),
      providesTags: ['COLOR']
    })
  })
});