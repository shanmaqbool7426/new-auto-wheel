import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const reviewsApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.REVIEWS.GET_ALL,
        method: 'GET',
        params
      }),
      providesTags: ['REVIEWS']
    }),

    submitReview: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.REVIEWS.SUBMIT,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['REVIEWS']
    }),

    getReviewsByVehicle: builder.query({
      query: (vehicleId) => ({
        url: `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE}/${vehicleId}`,
        method: 'GET'
      }),
      providesTags: (result, error, vehicleId) => [
        { type: 'REVIEWS', id: vehicleId }
      ]
    }),

    getOverallRatings: builder.query({
      query: (vehicleId) => ({
        url: `${API_ENDPOINTS.REVIEWS.REVIEWS_BY_VEHICLE_OVERALL}/${vehicleId}`,
        method: 'GET'
      }),
      providesTags: ['REVIEWS']
    }),

    // User Reviews
    getDealerReviews: builder.query({
      query: (dealerId) => ({
        url: `${API_ENDPOINTS.USER_REVIEWS.GET_USER_REVIEWS_BY_DEALER_ID}/${dealerId}`,
        method: 'GET'
      }),
      providesTags: (result, error, dealerId) => [
        { type: 'USER_REVIEWS', id: dealerId }
      ]
    })
  })
});

export const {
  useGetAllReviewsQuery,
  useSubmitReviewMutation,
  useGetReviewsByVehicleQuery,
  useGetOverallRatingsQuery,
  useGetDealerReviewsQuery
} = reviewsApi;