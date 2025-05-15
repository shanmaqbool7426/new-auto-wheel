import { BASE_API } from '@/api-services/base-api';
import { TRANSMISSION_BASE } from '@/constants/api-endpoints';

export const transmissionAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getTransmissions: builder.query({
      query: (params) => ({
        url: `${TRANSMISSION_BASE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['TRANSMISSIONS'],
    }),
    getTransmissionsByType: builder.query({
      query: (params) => ({
        url: `${TRANSMISSION_BASE}/type`,
        method: 'GET',
        params,
      }),
    }),

    updateTransmission: builder.mutation({
      query: ({ body, id }) => ({
        url: `${TRANSMISSION_BASE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    deleteTransmission: builder.mutation({
      query: (id) => ({
        url: `${TRANSMISSION_BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    addTransmission: builder.mutation({
      query: (body) => ({
        url: `${TRANSMISSION_BASE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TRANSMISSIONS'],
    }),

    deleteBulkTransmission: builder.mutation({
      query(ids) {
        return {
          url: `${TRANSMISSION_BASE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['TRANSMISSIONS'],
    }),
  }),
});

export const {
  useGetTransmissionsQuery,
  useGetTransmissionsByTypeQuery,
  useAddTransmissionMutation,
  useUpdateTransmissionMutation,
  useDeleteTransmissionMutation,
  useDeleteBulkTransmissionMutation,
} = transmissionAPIs; 