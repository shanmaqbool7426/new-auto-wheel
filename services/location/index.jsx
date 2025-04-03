import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const locationApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => ({
        url: API_ENDPOINTS.LOCATION.GET_PROVINCES,
        method: 'GET'
      }),
      transformResponse: (response) => response.data,
      providesTags: ['LOCATION']
    }),

    getCities: builder.query({
      query: (provinceId) => ({
        url: API_ENDPOINTS.LOCATION.GET_CITIES(provinceId),
        method: 'GET'
      }),
      transformResponse: (response) => response.data,
      providesTags: ['LOCATION']
    }),

    getSuburbs: builder.query({
      query: (cityId) => ({
        url: API_ENDPOINTS.LOCATION.GET_SUBURBS(cityId),
        method: 'GET'
      }),
      transformResponse: (response) => response.data,
      providesTags: ['LOCATION']
    })
  })
});

export const {
  useGetProvincesQuery,
  useGetCitiesQuery,
  useGetSuburbsQuery
} = locationApi;