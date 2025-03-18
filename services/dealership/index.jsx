import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const dealershipApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getDealerships: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.DEALER.LIST,
        method: 'GET',
        params
      }),
      providesTags: ['DEALERS']
    }),

    getDealershipDetail: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.DEALER.DETAIL(id),
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'DEALERS', id }]
    }),

    getDealerInventory: builder.query({
      query: (dealerId) => ({
        url: API_ENDPOINTS.DEALER.INVENTORY(dealerId),
        method: 'GET'
      }),
      providesTags: ['DEALERS', 'VEHICLES']
    }),

    getNearbyDealers: builder.query({
      query: ({ lat, lng, radius }) => ({
        url: API_ENDPOINTS.DEALER.NEARBY,
        method: 'GET',
        params: { lat, lng, radius }
      }),
      providesTags: ['DEALERS']
    })
  })
});

export const {
  useGetDealershipsQuery,
  useGetDealershipDetailQuery,
  useGetDealerInventoryQuery,
  useGetNearbyDealersQuery
} = dealershipApi;