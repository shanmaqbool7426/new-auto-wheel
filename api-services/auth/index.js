// Auth Services

import { BASE_API } from '../base-api';
import { END_POINTS } from '../../constants/endpoint.js';

export const authAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => END_POINTS.GET_USER,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: END_POINTS.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: END_POINTS.REGISTER,
        method: 'POST',
        body: data,
      }),
    }),

    termsUpdate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.TERMS_UPDATE}?id=${data.id}&terms=${data.terms}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useTermsUpdateMutation } = authAPIs;

