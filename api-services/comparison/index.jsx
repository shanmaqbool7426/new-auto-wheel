// services/comparison/index.jsx

import { BASE_API } from '@/api-services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const comparisonAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getComparisonSets: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.COMPARISON}/list`,
        method: 'GET',
        params,
      }),
      providesTags: ['COMPARISON'],
    }),

    // New endpoint for vehicle comparison
    compareVehicles: builder.mutation({
      query: ({ type, vehicleDetails }) => {
        // If vehicleDetails is provided as a slug string, parse it
        let vehicles = vehicleDetails;
        
        if (typeof vehicleDetails === 'string') {
          // Parse slug format: make-model-variant_make-model-variant
          const slug = decodeURIComponent(vehicleDetails);
          vehicles = slug.split('_').map((vehicleStr) => {
            const [make, model, ...variantParts] = vehicleStr.split('-');
            const variant = variantParts.length > 0 ? variantParts.join('-') : undefined;
            return { make, model, ...(variant ? { variant } : {}) };
          });
        }

        // Format the payload with up to 3 vehicles
        const payload = {
          vehicle1: vehicles[0] || null,
          vehicle2: vehicles[1] || null,
          vehicle3: vehicles[2] || null,
        };

        return {
          url: `${API_ENDPOINTS.NEW_VEHICLE.COMPARISON}?type=${encodeURIComponent(type)}`,
          method: 'POST',
          body: payload,
        };
      },
      providesTags: ['VEHICLE_COMPARISON'],
    }),

    addComparisonSet: builder.mutation({
      query: (body) => ({
        url: `${END_POINTS?.COMPARISON}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['COMPARISON'],
    }),

    updateComparisonSet: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS?.COMPARISON}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['COMPARISON'],
    }),

    deleteComparisonSet: builder.mutation({
      query(id) {
        return {
          url: `${END_POINTS?.COMPARISON}/${id}`,
          method: 'DELETE'
          // body: { ids: ids },
        };
      },
      invalidatesTags: ['COMPARISON'],
    }),

    // for models
    addComparisonVehicle: builder.mutation({
      query: ({ makeId, name }) => ({
        url: `${END_POINTS?.COMPARISON}/${makeId}/models`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['COMPARISON']
    }),
    // update model
    updateComparisonVehicle: builder.mutation({
      query: ({ id, makeId, data }) => ({
        url: `${END_POINTS?.COMPARISON}/${makeId}/models/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['COMPARISON'],
    }),
  }),
});


export const {
  useGetComparisonSetsQuery,
  useCompareVehiclesMutation,
  useUpdateComparisonSetMutation,
  useAddComparisonSetMutation,
  useDeleteComparisonSetMutation,
  useAddComparisonVehicleMutation,
  useUpdateComparisonVehicleMutation,
} = comparisonAPIs;
