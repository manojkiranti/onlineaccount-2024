import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';
import { SetPasswordPayload } from '@/pages/auth/types';

interface VerifyTokenRequest {
  code: string;
}
interface AuthLoginResponse {
  access_token: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  name: string;
  refresh_token: string;
  message: string;
  is_2fa_enabled: boolean;
  two_factor_required: boolean;
  temp_token?: string;
}

interface GoogleAuthLinkResponse {
  google_signin_link: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  country: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  fullname: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  is_2fa_enabled: boolean;
  two_factor_required: boolean;
  temp_token?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    fetchGoogleAuthLink: builder.query<string, void>({
      query: () => 'api/auth/google-redirect-link',
      transformResponse: (response: ApiResponse<GoogleAuthLinkResponse>) => {
        return response.data.google_signin_link;
      },
    }),
    verifyGoogleToken: builder.mutation<
      ApiResponse<AuthLoginResponse>,
      VerifyTokenRequest
    >({
      query: (body) => ({
        url: 'api/auth/google-verify-token',
        method: 'POST',
        body,
      }),
    }),
    userLogin: builder.mutation<ApiResponse<AuthLoginResponse>, LoginRequest>({
      query: (body) => ({
        url: 'api/auth/login',
        method: 'POST',
        body,
      }),
    }),
    userRegister: builder.mutation<
      ApiResponse<{ message: string }>,
      { body: RegisterRequest; source: string }
    >({
      query: ({ body, source }) => {
        return {
          url: `/api/auth/register?source=${encodeURIComponent(source)}`,
          method: 'POST',
          body,
        };
      },
    }),
    resendRegisterEmail: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: '/api/auth/resend-verification-email/',
        method: 'POST',
        body,
      }),
    }),

    setPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      SetPasswordPayload
    >({
      query: (body) => ({
        url: 'api/auth/set-password/',
        method: 'POST',
        body,
      }),
    }),
    forgetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: 'api/auth/forgot-password/',
        method: 'POST',
        body,
      }),
    }),
    verifyRegisterEmail: builder.query<
      ApiResponse<{ message: string }>,
      { token: string }
    >({
      query: ({ token }) => `api/auth/verify-email/${token}/`,
    }),
    verify2FA: builder.mutation<
      LoginResponse,
      { code: string | number; temp_token: string }
    >({
      query: (body) => ({
        url: 'api/auth/verify-2fa/',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {
  useFetchGoogleAuthLinkQuery,
  useVerifyGoogleTokenMutation,
  useUserLoginMutation,
  useSetPasswordMutation,
  useForgetPasswordMutation,
  useUserRegisterMutation,
  useVerifyRegisterEmailQuery,
  useVerify2FAMutation,
  useResendRegisterEmailMutation,
} = authApi;
