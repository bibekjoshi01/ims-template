import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { noAuthRoutes } from './routes';

// Constructing the base URL dynamically using environment variables.
// export const baseURL = `${import.meta.env.VITE_PUBLIC_APP_HTTP_SCHEME}${import.meta.env.VITE_PUBLIC_APP_BASE_URL}${import.meta.env.VITE_PUBLIC_APP_API_VERSION}/`;

export const baseURL = 'http://localhost:8000/api/v1/'; // For local development

/* Replace `showToast` with your actual toast notification method. */
const showToast = console.log;

// Main Axios instance
export const axiosInstance = axios.create({
  baseURL
});

// Separate instance for refreshing tokens
const refreshInstance = axios.create({
  baseURL
});

// Flag to track ongoing token refresh process
let isTokenRefreshInProgress = false;

// Queue to hold requests while token refresh is in progress
let tokenRefreshSubscribers: ((newToken: string) => void)[] = [];

/**
 * Adds a callback to the queue that will be called after token refresh.
 * @param callback - Function to be executed with the new token.
 */
const subscribeToTokenRefresh = (callback: (newToken: string) => void) => {
  tokenRefreshSubscribers.push(callback);
};

/**
 * Executes all queued callbacks after a token is refreshed.
 * @param newToken - The refreshed token.
 */
const notifyTokenRefreshed = (newToken: string) => {
  tokenRefreshSubscribers.forEach((callback) => callback(newToken));
  tokenRefreshSubscribers = [];
};

/**
 * Request Interceptor
 * Adds authorization headers and handles content type dynamically.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!window.navigator.onLine) {
      showToast('No internet connection available.');
    }

    config.headers = config.headers || {};

    const accessToken = Cookies.get('access');

    // Check if the route is exempt from authentication
    const isExemptRoute = noAuthRoutes.some((path) => config?.url?.endsWith(path));

    if (accessToken && !isExemptRoute) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Set appropriate Content-Type
    if (config?.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Handles errors, token expiration, and other status codes.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.data?.message) {
      showToast(response.data.message);
    }
    return response;
  },
  async (error) => {
    const errorConfig = error?.config as AxiosRequestConfig & { _retry?: boolean };

    if (axios.isCancel(error)) {
      showToast(`Request canceled: ${error.message}`);
    } else if (error.message === 'No Internet') {
      showToast('No internet connection available.');
    } else if (error.toJSON().message === 'Network Error') {
      showToast('Network Error.');
    }
    // Handle 401 Unauthorized errors
    else if (error.response?.status === 401) {
      if (error.response.data?.code === 'token_not_valid' && !errorConfig._retry) {
        errorConfig._retry = true;

        const refreshToken = Cookies.get('refresh');
        if (!refreshToken) {
          showToast('Session expired. Please log in again.');
          Cookies.remove('access', { path: '/' });
          window.location.href = '/';
          return;
        }

        // Refresh token logic
        if (!isTokenRefreshInProgress) {
          isTokenRefreshInProgress = true;

          try {
            const response = await refreshInstance.post('/auth/refresh/', { refresh: refreshToken });
            if (response?.status === 200) {
              const newToken = response.data.access;
              Cookies.set('access', newToken, {
                secure: true,
                path: '/',
                sameSite: 'Lax'
              });

              notifyTokenRefreshed(newToken);
              isTokenRefreshInProgress = false;

              errorConfig.headers!['Authorization'] = `Bearer ${newToken}`;
              return axiosInstance(errorConfig);
            }
          } catch (refreshError) {
            showToast('Session expired. Please log in again.');
            Cookies.remove('access', { path: '/' });
            window.location.href = '/';
            isTokenRefreshInProgress = false;
            throw refreshError;
          }
        }

        // Queue requests until token is refreshed
        return new Promise<AxiosResponse>((resolve) => {
          subscribeToTokenRefresh((newToken: string) => {
            errorConfig.headers!['Authorization'] = `Bearer ${newToken}`;
            resolve(axiosInstance(errorConfig));
          });
        });
      } else {
        showToast('Session expired. Logging you out.');
        Cookies.remove('access', { path: '/' });
        window.location.href = '/';
      }
    }
    // Handle other error statuses
    else if (error.response?.status === 403) {
      showToast('Permission denied.');
    } else if (error.response?.status === 404) {
      showToast('Resource not found.');
    } else if (error.response?.status === 405) {
      showToast('Method not allowed.');
    } else if (error.response?.status === 500 || error.response?.status > 500) {
      showToast('Server error, try again later.');
    }

    throw error;
  }
);
