import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const userProfileApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: API_ENDPOINTS.USER.PROFILE,
        method: 'GET'
      }),
      providesTags: ['USER']
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.USER.PROFILE,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['USER']
    }),

    getUserFavorites: builder.query({
      query: () => ({
        url: API_ENDPOINTS.USER.FAVORITES,
        method: 'GET'
      }),
      providesTags: ['USER', 'FAVORITES']
    }),

    toggleFavorite: builder.mutation({
      query: (vehicleId) => ({
        url: API_ENDPOINTS.USER.TOGGLE_FAVORITE(vehicleId),
        method: 'POST'
      }),
      invalidatesTags: ['FAVORITES']
    })
  })
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserFavoritesQuery,
  useToggleFavoriteMutation
} = userProfileApi;