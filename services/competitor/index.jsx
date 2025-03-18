import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const competitorApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitors: builder.query({
      query: (vehicleId) => ({
        url: API_ENDPOINTS.COMPETITOR.GET(vehicleId),
        method: 'GET'
      }),
      providesTags: ['COMPETITOR']
    })
  })
});

export const { useGetCompetitorsQuery } = competitorApi;