import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/types";

import { mapObjectKeysToSnakeCase } from "@/utils/mapper";

export const stepAPI = createApi({
  reducerPath: "stepAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      // Set the Accept header for all requests
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      ApiResponse<{ file_url: string }>,
      {token:string, file:FormData}
    >({
      query: ({token, file}) => {
        return {
          url: `api/online/document/upload/${token}`, // Adjust the URL according to your API endpoint
          method: 'POST',
          body: file,
          // No need to set Content-Type header, fetchBaseQuery will handle it
        };
      },
    }),
    postStepOne: builder.mutation<
      ApiResponse<{reference_number:string}>,
      any
    >({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        return {
          url: "api/online/step-one/store",
          method: "POST",
          body: transformedData,
        };
      },
    }),
    postStepTwo: builder.mutation<
      ApiResponse<{token:string}>,
      {payload:any, token:string}
    >({
      query: (body) => {
  
        return {
          url: `api/online/step-two/store/${body.token}`,
          method: "POST",
          body: body.payload,
        };
      },
    }),
    postStepThree: builder.mutation<
      ApiResponse<{token:string}>,
      {payload:any, token:string}
    >({
      query: (body) => {
  
        return {
          url: `api/online/step-three/store/${body.token}`,
          method: "POST",
          body: body.payload,
        };
      },
    }),
    postStepFour: builder.mutation<
      ApiResponse<{token:string}>,
      {payload:any, token:string}
    >({
      query: (body) => {
  
        return {
          url: `api/online/step-four/store/${body.token}`,
          method: "POST",
          body: body.payload,
        };
      },
    }),
    postStepFive: builder.mutation<
      ApiResponse<any>,
      {token:string}
    >({
      query: (body) => {
  
        return {
          url: `api/online/step-five/store/${body.token}`,
          method: "POST"
        };
      },
    }),
    getRequiredDocuments: builder.query<any, string>({
      query: ( token) => `api/online/step-five/documents/${token}`,
    }),
    verifyStepOne: builder.mutation<
      ApiResponse<{token:string}>,
      any
    >({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        return {
          url: "api/online/otp-verify",
          method: "POST",
          body: transformedData,
        };
      },
    }),
  }),
});

export const { 
  usePostStepOneMutation, 
  useVerifyStepOneMutation, 
  usePostStepTwoMutation, 
  usePostStepThreeMutation, 
  usePostStepFourMutation, 
  useUploadFileMutation, 
  usePostStepFiveMutation,
  useGetRequiredDocumentsQuery 
} = stepAPI;
