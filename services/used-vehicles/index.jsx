import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const usedVehiclesApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    // Get Used Vehicles Listing with filters
    getUsedVehicles: builder.query({
      query: (filters = {}) => ({
        url: API_ENDPOINTS.VEHICLE.LISTINGS,
        method: 'GET',
        params: filters
      }),
      providesTags: ['VEHICLES']
    }),

    // Get Used Vehicle Detail
    getUsedVehicleDetail: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.VEHICLE.DETAIL(id),
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'VEHICLES', id }]
    }),

    // Add Used Vehicle
    addUsedVehicle: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.VEHICLE.ADD,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['VEHICLES']
    }),

    // Update Used Vehicle
    updateUsedVehicle: builder.mutation({
      query: ({ vehicleId, ...data }) => ({
        url: API_ENDPOINTS.VEHICLE.Update(vehicleId),
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { vehicleId }) => [
        { type: 'VEHICLES', id: vehicleId }
      ]
    }),

    // Get Similar Used Vehicles
    getSimilarUsedVehicles: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.VEHICLE.SIMILAR,
        method: 'GET',
        params: { id }
      }),
      providesTags: ['VEHICLES']
    }),

    // Get Used Vehicles by Type
    getUsedVehiclesByType: builder.query({
      query: (type) => ({
        url: API_ENDPOINTS.VEHICLE.LIST_BY_TYPE(type),
        method: 'GET'
      }),
      providesTags: ['VEHICLES']
    }),

    // Get Used Vehicle Detail by Seller
    getUsedVehicleDetailBySeller: builder.query({
      query: (vehicleId) => ({
        url: API_ENDPOINTS.VEHICLE.DETAIL_BY_SELLER(vehicleId),
        method: 'GET'
      }),
      providesTags: (result, error, vehicleId) => [{ type: 'VEHICLES', id: vehicleId }]
    }),

    // Get Top Performing Used Vehicle Posts
    getTopPerformingPosts: builder.query({
      query: () => ({
        url: API_ENDPOINTS.VEHICLE.TOP_PERFORMING_POSTS,
        method: 'GET'
      }),
      providesTags: ['VEHICLES']
    }),

    // Get Popular Used Vehicles by Make
    getPopularUsedVehicles: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.VEHICLE.MAKES_WITH_POPULAR(make, type),
        method: 'GET'
      }),
      providesTags: ['VEHICLES']
    }),

    // Browse Used Vehicles by Make
    browseByMake: builder.query({
      query: () => ({
        url: API_ENDPOINTS.BROWSE.BY_MAKE,
        method: 'GET'
      }),
      providesTags: ['BROWSE']
    }),

    // Browse Used Vehicles by Body Type
    browseByBody: builder.query({
      query: () => ({
        url: API_ENDPOINTS.BROWSE.BY_BODY,
        method: 'GET'
      }),
      providesTags: ['BROWSE']
    }),

    // Get Makes with Popular Used Vehicles
    getMakesWithPopular: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.BROWSE.MAKES_WITH_POPULAR(make, type),
        method: 'GET'
      }),
      providesTags: ['BROWSE']
    })
  })
});

// Export hooks for usage in components
export const {
  useGetUsedVehiclesQuery,
  useGetUsedVehicleDetailQuery,
  useAddUsedVehicleMutation,
  useUpdateUsedVehicleMutation,
  useGetSimilarUsedVehiclesQuery,
  useGetUsedVehiclesByTypeQuery,
  useGetUsedVehicleDetailBySellerQuery,
  useGetTopPerformingPostsQuery,
  useGetPopularUsedVehiclesQuery,
  useBrowseByMakeQuery,
  useBrowseByBodyQuery,
  useGetMakesWithPopularQuery
} = usedVehicleApi;