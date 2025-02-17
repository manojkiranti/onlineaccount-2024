import { ApiResponse, CustomerRequestPayload, ServiceRequestPayload } from '@/types';
import { mapObjectKeysToSnakeCase } from '@/utils/mapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coreAPI = createApi({
  reducerPath: 'coreAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    fetchCountryByIP: builder.query<
      { data: { country: string; ip: string } },
      void
    >({
      query: () => '/api/core/user-country/',
    }),
    fetchLenders: builder.query<any, void>({
      query: () => '/api/core/lenders/',
    }),
    fetchImageURL: builder.query<any, { image_url: string }>({
      query: ({ image_url }) => {
        console.log('image_url', image_url);
        return `/api/core/get_image?image_url=${encodeURIComponent(image_url)}`;
      },
    }),
    customerServiceRequest: builder.mutation<ApiResponse<{ref_number: string, service_type:string}>, ServiceRequestPayload>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        if(body.prop_values) {
         const transformedPropsVaues =  mapObjectKeysToSnakeCase(body.prop_values);
         transformedData.prop_values = transformedPropsVaues;
        }
        
        transformedData.channel = 'web';
        return{
          url: 'api/customer-service-request',
          method: 'POST',
          body: transformedData
        }
      },
    }),
    serviceOtpVerify: builder.mutation<ApiResponse<{id: string, message: string}>, {service_type:string, ref_number: string, otp:string}>({
      query: (body) => {
        return{
          url: 'api/verify-customer-service-request',
          method: 'POST',
          body: body
        }
      },
    }),
    getPrerequisit: builder.query<ApiResponse<any>, void>({
      query: () => 'api/online/all-prerequisite',
      
    }),
    getBranchList: builder.query<ApiResponse<any>, void>({
      query: () => 'api/online/branch',
    }),
    getDistrictByProvince: builder.query<ApiResponse<any>, string | undefined>({
      query: (id) => `api/online/district/${id}`,
    }),
    getLocalGovernmentByDistrict: builder.query<ApiResponse<any>, string | undefined>({
      query: (id) => `api/online/local-government/${id}`,
    })
  }),
});

export const {
  useFetchCountryByIPQuery,
  useFetchLendersQuery,
  useFetchImageURLQuery,
  useCustomerServiceRequestMutation,
  useServiceOtpVerifyMutation,
  useGetPrerequisitQuery,
  useGetBranchListQuery,
  useGetDistrictByProvinceQuery,
  useGetLocalGovernmentByDistrictQuery
} = coreAPI;
