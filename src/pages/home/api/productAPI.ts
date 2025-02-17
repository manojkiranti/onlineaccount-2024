import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';

import { mapObjectKeysToCamelCase } from '@/utils/mapper';
import { Product } from '../types';


export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    
    getProducts: builder.query<ApiResponse<Product[]>, void>({
        query: () => 'api/online/products',
        transformResponse: (response: ApiResponse<any>) => {
          response.data = response.data.map((item: any) => {
            return mapObjectKeysToCamelCase(item);
          });
          return response;
        },
      }),
     
  }),
});

export const {
  useGetProductsQuery,
} = productAPI;
