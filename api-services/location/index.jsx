  import { LOCATION_PROVINCES,LOCATION_CITIES,LOCATION_SUBURBS } from '@/constants/api-endpoints';
  import { BASE_API } from '@/api-services/base-api';
  export const locationAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    // getLocations: builder.query({
    //   query: (params) => ({
    //     url: `${END_POINTS?.LOCATION}/all`,
    //     method: 'GET',
    //     params,
    //   }),
    //   providesTags: ['LOCATIONS'],
    // }),
    // getProvinces
    getProvinces: builder.query({
      query: () => ({
        url: LOCATION_PROVINCES,  
        method: 'GET',
      }),
      providesTags: ['LOCATIONS'],
    }),
// get cities
getCities: builder.query({
  query: () => ({
    url: LOCATION_CITIES,
    method: 'GET',
    }),
    providesTags: ['LOCATIONS'],
  }),
  // get suburbs
  getSuburbs: builder.query({
    query: () => ({
      url: LOCATION_SUBURBS,
      method: 'GET',
    })
  }),
    // getStatesOfCountry: function () {
    //   return this.query({
    //     url: `${END_POINTS?.LOCATION_PROVINCES}`,
    //     method: 'GET',
    //   });
    // },

    // addLocation: builder.mutation({
    //   query: (body) => ({
    //     url: `${END_POINTS?.LOCATION}`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['LOCATIONS'],
    // }),
    // updateLocation: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `${END_POINTS?.LOCATION}/${id}`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    //   invalidatesTags: ['LOCATIONS'],

    // }),
    // deleteLocation: builder.mutation({
    //   query(id) {
    //     return {
    //       url: `${END_POINTS?.LOCATION}/${id}`,
    //       method: 'Delete',
    //     };
    //   },
    //   invalidatesTags: ['LOCATIONS'],
    // }),

    // deleteBulkLocation: builder.mutation({
    //   query(ids) {
    //     return {
    //       url: `${END_POINTS?.LOCATION_DELETE}`,
    //       method: 'POST',
    //       body: { ids: ids },
    //     };
    //   },
    //   invalidatesTags: ['LOCATIONS'],
    // }),
    // getChildrenLocations: builder.query({
    //   query: (parentId) => ({
    //     url: `${END_POINTS?.LOCATION_CHILDREN}/${parentId}`,
    //     method: 'GET',
    //   }),
    // }),
  }),
});


export const {
  // useGetLocationsQuery,
  useGetProvincesQuery,
  useGetCitiesQuery,
  useGetSuburbsQuery,
  // useGetChildrenLocationsQuery,
  // useAddLocationMutation,
  // useUpdateLocationMutation,
  // useDeleteBulkLocationMutation,
  // useDeleteLocationMutation,
  // useGetStatesOfCountry,
} = locationAPIs;
