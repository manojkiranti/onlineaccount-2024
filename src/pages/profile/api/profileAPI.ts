import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/lib/baseQuery';
import { ApiResponse } from '@/types';
import { Enable2faResponse } from '../types';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    enable2FA: builder.mutation<ApiResponse<Enable2faResponse>, void>({
      query: (body) => ({
        url: 'api/auth/enable-2fa/',
        method: 'POST',
        body,
      }),
    }),
    verifyEnable2FA: builder.mutation<
      ApiResponse<any>,
      { code: string | number }
    >({
      query: (body) => ({
        url: 'api/auth/verify-enable-2fa/',
        method: 'POST',
        body,
      }),
    }),
    disable2FA: builder.mutation<
      ApiResponse<{ message: string }>,
      { code: string | number }
    >({
      query: (body) => ({
        url: 'api/auth/disable-2fa/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useEnable2FAMutation,
  useVerifyEnable2FAMutation,
  useDisable2FAMutation,
} = profileAPI;
