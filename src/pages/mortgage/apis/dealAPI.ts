import { customBaseQuery } from '@/lib/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const dealAPI = createApi({
  reducerPath: 'dealAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPreApproval: builder.query({
      query: () => `/api/deals/v1/?loan_type=Pre-approval`,
    }),
    getDealsList: builder.query({
      query: () => `/api/deals/v1/`,
    }),
  }),
});

export const { useGetPreApprovalQuery, useGetDealsListQuery } = dealAPI;
