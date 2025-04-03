import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const newVehiclesApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    // Get New Vehicles Listing
    getNewVehicles: builder.query({
      query: (filters = {}) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.LISTINGS,
        method: 'GET',
        params: filters
      }),
      providesTags: ['NEW_VEHICLES']
    }),

    // Get New Vehicle Detail
    getNewVehicleDetail: builder.query({
      query: (slug) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.DETAIL(slug),
        method: 'GET'
      }),
      providesTags: (result, error, slug) => [{ type: 'NEW_VEHICLES', id: slug }]
    }),

    // Get Upcoming Vehicles
    getUpcomingVehicles: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.UPCOMMING(make, type),
        method: 'GET'
      }),
      providesTags: ['NEW_VEHICLES']
    }),

    // Get Vehicles by Make
    getVehiclesByMake: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.MAKE_BY_VEHICLES(make, type),
        method: 'GET'
      }),
      providesTags: ['NEW_VEHICLES']
    }),

    // Get Popular Vehicles
    getPopularVehicles: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.MAKES_WITH_POPULAR(make, type),
        method: 'GET'
      }),
      providesTags: ['NEW_VEHICLES']
    }),

    // Get Newly Launched Vehicles
    getNewlyLaunchedVehicles: builder.query({
      query: ({ make, type }) => ({
        url: API_ENDPOINTS.NEW_VEHICLE.NEWLY_LAUNCHED_VEHICLES(make, type),
        method: 'GET'
      }),
      providesTags: ['NEW_VEHICLES']
    }),

    // Get Vehicle Comparison
    getVehicleComparison: builder.mutation({
      query: ({ vehicles, type }) => ({
        url: `${API_ENDPOINTS.NEW_VEHICLE.COMPARISON}?type=${encodeURIComponent(type)}`,
        method: 'POST',
        body: vehicles
      })
    }),

    // Get Top Comparisons
    getTopComparisons: builder.query({
      query: () => ({
        url: API_ENDPOINTS.NEW_VEHICLE.TOPCOMPARISON,
        method: 'GET'
      }),
      providesTags: ['COMPARISON']
    }),

    // Browse by Make
    browseByMake: builder.query({
      query: (type) => ({
        url: `${API_ENDPOINTS.BROWSE.BY_MAKE}?type=${encodeURIComponent(type)}`,
        method: 'GET'
      }),
      providesTags: ['BROWSE']
    }),

    // Browse by Body
    browseByBody: builder.query({
      query: () => ({
        url: API_ENDPOINTS.BROWSE.BY_BODY,
        method: 'GET'
      }),
      providesTags: ['BROWSE']
    })
  })
});

export const {
  useGetNewVehiclesQuery,
  useGetNewVehicleDetailQuery,
  useGetUpcomingVehiclesQuery,
  useGetVehiclesByMakeQuery,
  useGetPopularVehiclesQuery,
  useGetNewlyLaunchedVehiclesQuery,
  useGetVehicleComparisonMutation,
  useGetTopComparisonsQuery,
  useBrowseByMakeQuery,
  useBrowseByBodyQuery
} = newVehicleApi;