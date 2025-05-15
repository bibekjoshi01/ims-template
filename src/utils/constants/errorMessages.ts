// Function to handle error messages based on status
export const getErrorMessage = (axiosError: any) => {
  let message = '';
  let variant: 'error' | 'info' | 'default' | 'success' | 'warning' = 'error';

  if (axiosError?.response?.status === 404) {
    message = 'We couldn’t find that you were looking for. Please check and try again.';
    variant = 'warning';
  } else if (axiosError?.response?.status >= 500) {
    message = 'Oops! Something went wrong on our end. Please try again later.';
    variant = 'error';
  } else if (axiosError?.isRefreshError) {
    message = 'Session expired. Please log in again.';
    variant = 'warning';
  }

  return { message, variant };
};
