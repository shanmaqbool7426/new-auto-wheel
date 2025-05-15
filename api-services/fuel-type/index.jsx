import { BASE_API } from '@/api-services/base-api';
import { FUEL_TYPE_BASE } from '@/constants/api-endpoints';

export const fuelTypeAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getFuelTypes: builder.query({
      query: (params) => ({
        url: `${FUEL_TYPE_BASE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['FUEL_TYPES'],
    }),

    updateFuelType: builder.mutation({
      query: ({ body, id }) => ({
        url: `${FUEL_TYPE_BASE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    deleteFuelType: builder.mutation({
      query: (id) => ({
        url: `${FUEL_TYPE_BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    addFuelType: builder.mutation({
      query: (body) => ({
        url: `${FUEL_TYPE_BASE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FUEL_TYPES'],
    }),

    deleteBulkFuelType: builder.mutation({
      query(ids) {
        return {
          url: `${FUEL_TYPE_BASE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['FUEL_TYPES'],
    }),
  }),
});

export const {
  useGetFuelTypesQuery,
  useAddFuelTypeMutation,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation,
  useDeleteBulkFuelTypeMutation,
} = fuelTypeAPIs;