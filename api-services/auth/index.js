// Auth Services

import { BASE_API } from '../base-api';
// import { BASE_URL, END_POINTS } from '../../constants/api-endpoints';
import { API_ENDPOINTS, BASE_URL } from '../../constants/api-endpoints';
export const authAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => API_ENDPOINTS.AUTH.GET_USER,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    updateAccountType: builder.mutation({
      query: ({accountType, token}) => ({
        url: `${BASE_URL}/api/user/update-account-type`,
        method: 'POST',
        body: {accountType},
        headers: {
          'Authorization': `${token}`
        }
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: 'POST',
        body: data,
      }),
    }),

    termsUpdate: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.AUTH.TERMS_UPDATE}?id=${data.id}&terms=${data.terms}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useRegisterMutation, useTermsUpdateMutation, useUpdateAccountTypeMutation } = authAPIs;

