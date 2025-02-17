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
        };navigate(`/online-apply/step-three/${res.data.token}`)
      },
    }),
  }),
});

export const { usePostStepOneMutation, useVerifyStepOneMutation, usePostStepTwoMutation, usePostStepThreeMutation } = stepAPI;
