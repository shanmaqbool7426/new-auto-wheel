import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/queries';

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: authApi.verifyOtp,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
}

export function useSocialLogin() {
  return useMutation({
    mutationFn: authApi.socialLogin,
  });
}