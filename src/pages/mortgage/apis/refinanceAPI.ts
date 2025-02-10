import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';

import { customBaseQuery } from '@/lib/baseQuery';
import {
  PropertyDetailPayload,
  RefinanceSteps,
  StepFormResponse,
  PersonalDetailPayload,
  IncomeDetailPayload,
} from '../types/Refinance';
import {
  mapObjectKeysToCamelCase,
  mapObjectKeysToSnakeCase,
} from '@/utils/mapper';

export const refinanceAPI = createApi({
  reducerPath: 'refinanceAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getRefinanceRequestList: builder.query<
      ApiResponse<StepFormResponse[]>,
      void
    >({
      query: () => `api/refinance/v1/assessment/list`,
    }),
    postRefinanceRequest: builder.mutation<
      ApiResponse<any>,
      IncomeDetailPayload | PersonalDetailPayload | PropertyDetailPayload
    >({
      query: ({ application_id, step, data }) => {
        const transformedData = mapObjectKeysToSnakeCase(data);
        return {
          url: `api/refinance/v1/step/`,
          method: 'POST',
          body: {
            application_id,
            step,
            data: transformedData,
          },
        };
      },
    }),
    getRefinanceStepDetail: builder.query<
      ApiResponse<StepFormResponse>,
      { application_id: string; step: RefinanceSteps }
    >({
      query: ({ application_id, step }) => ({
        url: `api/refinance/v1/step/${application_id}/${step}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<any>) => {
        response.data.data = mapObjectKeysToCamelCase(response.data.data);
        return response;
      },
    }),
  }),
});

export const {
  useGetRefinanceRequestListQuery,
  usePostRefinanceRequestMutation,
  useGetRefinanceStepDetailQuery,
} = refinanceAPI;
