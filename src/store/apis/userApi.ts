import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/lib/baseQuery';

import { ApiResponse, UserProfile } from '@/types';
import {
  mapObjectKeysToCamelCase,
  mapObjectKeysToSnakeCase,
} from '@/utils/mapper';

export type UserProfileResponse = {
  common_data: UserProfile;
};
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchRegisterType: builder.query<any, void>({
      query: () => '/api/user/register-type/',
      transformResponse: (response: ApiResponse<any>) => {
        return mapObjectKeysToCamelCase(response);
      },
    }),
    fetchUserProfile: builder.query<ApiResponse<UserProfileResponse>, void>({
      query: () => 'api/user/profile/',
      transformResponse: (response: ApiResponse<any>) => {
        response.data.common_data = mapObjectKeysToCamelCase(
          response.data.common_data,
        );
        return response;
      },
    }),
    fetchUserData: builder.query<ApiResponse<any>, void>({
      query: () => 'api/user/me/',
    }),
    postUserData: builder.mutation<ApiResponse<any>, any>({
      query: (body) => ({
        url: 'api/user/me/',
        method: 'POST',
        body,
      }),
    }),
    postUserProfile: builder.mutation<ApiResponse<any>, UserProfile>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        return {
          url: '/api/user/profile/update/',
          method: 'PATCH',
          body: {
            common_data: transformedData,
          },
        };
      },
    }),
    createProfile: builder.mutation<ApiResponse<any>, UserProfile>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        return {
          url: 'api/user/profile/create/',
          method: 'POST',
          body: transformedData,
        };
      },
    }),
    updateProfile: builder.mutation<ApiResponse<any>, UserProfile>({
      query: (body) => {
        const transformedData = mapObjectKeysToSnakeCase(body);
        return {
          url: 'api/user/profile/update/',
          method: 'POST',
          body: transformedData,
        };
      },
    }),
  }),
});
export const {
  useFetchUserProfileQuery,
  usePostUserProfileMutation,
  useFetchUserDataQuery,
  usePostUserDataMutation,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useFetchRegisterTypeQuery,
} = userApi;
