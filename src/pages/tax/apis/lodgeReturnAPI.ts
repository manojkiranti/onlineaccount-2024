import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';

import { customBaseQuery } from '@/lib/baseQuery';
import {
  mapObjectKeysToCamelCase,
  mapObjectKeysToSnakeCase,
} from '@/utils/mapper';

export const lodgeReturnAPI = createApi({
  reducerPath: 'lodgeReturnAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getLodgeReturnList: builder.query<ApiResponse<any>, void>({
      query: () => 'api/tax/v1/assessment/list/',
    }),
    postLodgeReturn: builder.mutation<ApiResponse<any>, any>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body.data);
        const { data, ...rest } = body;
        const combinedData = { data: transformedData, ...rest };
        return {
          url: 'api/tax/v1/assessment/',
          method: 'POST',
          body: combinedData,
        };
      },
    }),
    getApplicationDetail: builder.query<
      ApiResponse<any>,
      { application_id: string }
    >({
      query: ({ application_id }) => `api/tax/v1/assessment/${application_id}/`,
      transformResponse: (response: ApiResponse<any>) => {
        response.data.data = mapObjectKeysToCamelCase(response.data.data);
        return response;
      },
    }),
    putLodgeReturn: builder.mutation<ApiResponse<any>, any>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body.data);
        const { data, ...rest } = body;
        const combinedData = { data: transformedData, ...rest };
        return {
          url: 'api/tax/v1/assessment/',
          method: 'PUT',
          body: combinedData,
        };
      },
    }),
  }),
});

export const {
  useGetLodgeReturnListQuery,
  usePostLodgeReturnMutation,
  useGetApplicationDetailQuery,
  usePutLodgeReturnMutation,
} = lodgeReturnAPI;
