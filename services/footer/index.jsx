import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const footerApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFooterLinks: builder.query({
      query: () => ({
        url: API_ENDPOINTS.FOOTER.LIST,
        method: 'GET'
      }),
      providesTags: ['FOOTER']
    })
  })
});