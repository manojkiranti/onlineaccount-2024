import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';

import { customBaseQuery } from '@/lib/baseQuery';
import {
  IncomeDetailPayload,
  PersonalDetailPayload,
  PropertyDetailPayload,
  PurchaseRequestPayload,
  PurchaseSteps,
  StepFormResponse,
} from '../types/Purchase';
import {
  mapObjectKeysToCamelCase,
  mapObjectKeysToSnakeCase,
} from '@/utils/mapper';
import { PurchaseResponse } from '../routes/Purchase/types';

export const purchaseAPI = createApi({
  reducerPath: 'purchaseAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    postPurchaseRequest: builder.mutation<
      ApiResponse<any>,
      | PurchaseRequestPayload
      | PersonalDetailPayload
      | PropertyDetailPayload
      | IncomeDetailPayload
    >({
      query: ({ application_id, data, step }) => {
        const transformedData = mapObjectKeysToSnakeCase(data);
        return {
          url: 'api/purchase/v1/step/',
          method: 'POST',
          body: {
            application_id,
            data: transformedData,
            step,
          },
        };
      },
    }),
    getPurchaseStepDetail: builder.query<
      ApiResponse<StepFormResponse>,
      { application_id: string; step: PurchaseSteps }
    >({
      query: ({ application_id, step }) =>
        `api/purchase/v1/step/${application_id}/${step}`,
      transformResponse: (response: ApiResponse<any>) => {
        response.data.data = mapObjectKeysToCamelCase(response.data.data);
        return response;
      },
    }),
    getPurchaseRequestList: builder.query<
      ApiResponse<PurchaseResponse[]>,
      void
    >({
      query: () => `api/purchase/v1/assessment/list`,
    }),
  }),
});

export const {
  usePostPurchaseRequestMutation,
  useGetPurchaseStepDetailQuery,
  useGetPurchaseRequestListQuery,
} = purchaseAPI;
