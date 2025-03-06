import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const authApi = {
  signup: async (userData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    return data;
  },

  login: async (credentials) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
  },

  verifyOtp: async (otpData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, otpData);
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return data;
  },

  resetPassword: async (resetData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
    return data;
  },

  socialLogin: async (socialData) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, socialData);
    return data;
  },
};