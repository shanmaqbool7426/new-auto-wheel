import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const bookingApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.BOOKING.CREATE,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['BOOKINGS']
    }),

    getUserBookings: builder.query({
      query: () => ({
        url: API_ENDPOINTS.BOOKING.USER_BOOKINGS,
        method: 'GET'
      }),
      providesTags: ['BOOKINGS']
    }),

    getBookingDetail: builder.query({
      query: (bookingId) => ({
        url: API_ENDPOINTS.BOOKING.DETAIL(bookingId),
        method: 'GET'
      }),
      providesTags: (result, error, bookingId) => [{ type: 'BOOKINGS', id: bookingId }]
    }),

    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: API_ENDPOINTS.BOOKING.UPDATE_STATUS(bookingId),
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: 'BOOKINGS', id: bookingId }
      ]
    })
  })
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetBookingDetailQuery,
  useUpdateBookingStatusMutation
} = bookingApi;