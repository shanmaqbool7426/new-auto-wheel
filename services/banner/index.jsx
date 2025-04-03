import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const bannerApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: API_ENDPOINTS.BANNER.LIST,
        method: 'GET'
      }),
      providesTags: ['BANNER']
    })
  })
});