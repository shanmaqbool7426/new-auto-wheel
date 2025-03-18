import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const notificationApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: API_ENDPOINTS.NOTIFICATION.LIST,
        method: 'GET'
      }),
      providesTags: ['NOTIFICATIONS']
    }),

    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: API_ENDPOINTS.NOTIFICATION.MARK_READ(notificationId),
        method: 'PUT'
      }),
      invalidatesTags: ['NOTIFICATIONS']
    }),

    markAllAsRead: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.NOTIFICATION.MARK_ALL_READ,
        method: 'PUT'
      }),
      invalidatesTags: ['NOTIFICATIONS']
    }),

    updateNotificationPreferences: builder.mutation({
      query: (preferences) => ({
        url: API_ENDPOINTS.NOTIFICATION.PREFERENCES,
        method: 'PUT',
        body: preferences
      }),
      invalidatesTags: ['NOTIFICATIONS']
    })
  })
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useUpdateNotificationPreferencesMutation
} = notificationApi;