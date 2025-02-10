import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';
import {
  OnboardingPayload,
  OnboardStepResponse,
  RegisterEmailPayload,
  VerifyEmailResponse,
} from '../types';
import { mapObjectKeysToSnakeCase } from '@/utils/mapper';

export const onboardAPI = createApi({
  reducerPath: 'onboardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    postLeadData: builder.mutation<
      ApiResponse<OnboardStepResponse>,
      OnboardingPayload | RegisterEmailPayload
    >({
      query: ({ application_id, data, step }) => {
        const transformedData = mapObjectKeysToSnakeCase(data);
        return {
          url: 'api/lead/v1/step/',
          method: 'POST',
          body: {
            application_id,
            data: transformedData,
            step,
          },
        };
      },
    }),
    verifyEmail: builder.query<
      ApiResponse<VerifyEmailResponse>,
      { token: string }
    >({
      query: ({ token }) => `api/lead/v1/verify-email/${token}/`,
    }),
  }),
});

export const { useVerifyEmailQuery, usePostLeadDataMutation } = onboardAPI;
