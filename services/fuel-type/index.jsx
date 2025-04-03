import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fuelTypesApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFuelTypes: builder.query({
      query: (type) => ({
        url: API_ENDPOINTS.FUEL_TYPE.GET(type),
        method: 'GET'
      }),
      providesTags: ['FUEL_TYPE']
    })
  })
});

export const { useGetFuelTypesQuery } = fuelTypesApi;