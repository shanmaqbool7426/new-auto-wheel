import { BASE_API } from '../base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const authApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['AUTH']
    }),

    // Register
    register: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: 'POST',
        body: userData
      })
    }),

    // Verify OTP
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_OTP,
        method: 'POST',
        body: otpData
      })
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body: { email }
      })
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body: resetData
      })
    }),

    // Social Login
    socialLogin: builder.mutation({
      query: (socialData) => ({
        url: API_ENDPOINTS.AUTH.SOCIAL_LOGIN,
        method: 'POST',
        body: socialData
      }),
      invalidatesTags: ['AUTH']
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSocialLoginMutation
} = authApi;