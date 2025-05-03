/* eslint-disable */

import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosInstance, baseURL } from './axios';

const axiosBaseQuery =
  ({ URL } = { URL: '' }) =>
  async (args: any, api: any, extraOptions: any) => {
    const { url, method, data, params, headers, signal } = args;
    try {
      const result = await axiosInstance({
        url: URL + url,
        method,
        data,
        params,
        headers,
        cancelToken: signal
      });
      return { data: result.data };
    } catch (axiosError: any) {
      //dispatch from baseApiSlice.ts instead of axios.ts to avoid circular dependency error
      if (axiosError?.response?.status === 400) {
        //store 400 errors in common reducer
      } else if (axiosError?.isRefreshError) {
        //handle the error thrown by catch block of refresh token call in axios.ts
        //if refresh token is invalid as well then clear user data & cookies
        api.dispatch(rootAPI.util.resetApiState());
      }

      return {
        error: {
          status: axiosError?.response?.status,
          data: axiosError?.response?.data || axiosError?.message
        }
      };
    }
  };

export const rootAPI = createApi({
  reducerPath: 'rootAPI',
  baseQuery: axiosBaseQuery({
    URL: baseURL
  }),
  endpoints: (builder) => ({
    //create seperate endpoints for each files and inject with this one using injectEndpoints
  }),

  tagTypes: ['BlogCategory', 'User']
});
