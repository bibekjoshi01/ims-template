import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosInstance, baseURL } from './axios';
import { setMessage } from '@/pages/common/redux/common.slice';
import { enqueueSnackbar } from 'notistack';

// Function to handle error messages based on status
const getErrorMessage = (axiosError: any) => {
  let message = '';
  let variant: 'error' | 'info' | 'default' | 'success' | 'warning' = 'error';

  if (axiosError?.response?.status === 400) {
    message = 'There was an issue with your request. Please check and try again.';
    variant = 'error';
  } else if (axiosError?.response?.status === 404) {
    message = 'We couldn’t find the page you were looking for. Please check and try again.';
    variant = 'warning';
  } else if (axiosError?.response?.status === 500) {
    message = 'Oops! Something went wrong on our end. Please try again later.';
    variant = 'error';
  } else if (axiosError?.isRefreshError) {
    message = 'Session expired. Please log in again.';
    variant = 'warning';
  } else {
    message = 'An unexpected error occurred. Please check your connection.';
    variant = 'error';
  }

  return { message, variant };
};

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
      const { message, variant } = getErrorMessage(axiosError);

      // If it's a refresh error, reset the API state and clear user session
      if (axiosError?.isRefreshError) {
        api.dispatch(rootAPI.util.resetApiState()); // Reset the API state (e.g., clear user data, reset auth)
      }

      // Dispatch the message to store
      api.dispatch(setMessage({ message, variant }));

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
    // Define your endpoints here
  }),
  tagTypes: ['BlogCategory', 'User', 'UserRole']
});
