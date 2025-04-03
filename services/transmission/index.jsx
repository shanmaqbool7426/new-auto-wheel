import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const transmissionTypesApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getTransmissionTypes: builder.query({
      query: (type) => ({
        url: API_ENDPOINTS.TRANSMISSION.GET(type),
        method: 'GET'
      }),
      providesTags: ['TRANSMISSION']
    })
  })
});

export const { useGetTransmissionTypesQuery } = transmissionTypesApi;