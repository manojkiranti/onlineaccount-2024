import { customBaseQuery } from '@/lib/baseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchDashboardData: builder.query<any, void>({
      query: () => '/api/dashboard/',
    }),
  }),
});

export const { useFetchDashboardDataQuery } = dashboardAPI;
