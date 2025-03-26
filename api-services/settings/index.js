// for settings


import { BASE_API } from '../base-api/index.js';
import { END_POINTS } from '../../constants/endpoint.js';

export const settingsAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    // for update my details
    getUserDetails: builder.query({
      query: (data) => ({
        url: END_POINTS.USER_DETAILS + `/${data}`,
        method: 'GET',
      }),
      providesTags: ['USER_DETAILS'],
    }),

    // for publish my details mutation
    publish: builder.mutation({
      query: (params) => ({
        url: END_POINTS.SETTING_PUBLISH + `/${params}`,
        method: 'GET',
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),

    updateMyDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.MY_DETAILS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),
    updateBusinessProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.BUSINESS_PROFILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),

    // AddCertificateHours
    addCertificateHours: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CERTIFICATE_HOURS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),
    addAdditionalInfo: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_ADDITIONAL_INFO,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),
    addSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_SOCIAL_PROFILE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),
    deleteSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SOCIAL_DELETE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: END_POINTS.UPDATE_PASSWORD,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),

    addConversation: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CONVERSATION,
        method: 'POST',
        body: data,
      }),
    }),
    addPaymentDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_PAYMENT_DETAILS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],
    }),

    // invalidate  tags
    addBusinessLocation: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_BUSINESS_LOCATION,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER_DETAILS'],

    }),
   
  }),

 

});

export const {
  
  usePublishMutation,
  useUpdateMyDetailsMutation,
  useUpdateBusinessProfileMutation,
  useAddCertificateHoursMutation,
  useAddAdditionalInfoMutation,
  useAddSocialProfileMutation,
  useDeleteSocialProfileMutation,
  useUpdatePasswordMutation,
  useAddConversationMutation,
  useAddPaymentDetailsMutation,
  useAddBusinessLocationMutation,
  useGetUserDetailsQuery
} = settingsAPIs;


