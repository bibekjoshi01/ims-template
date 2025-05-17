let useSnackbarRef: (msg: string, options?: { variant: 'error' | 'success' | 'info' | 'warning' }) => void;

export const setSnackbar = (enqueueSnackbar: typeof useSnackbarRef) => {
  useSnackbarRef = enqueueSnackbar;
};

export const showErrorToast = (message: string) => {
  if (useSnackbarRef) {
    useSnackbarRef(message, { variant: 'error' });
  } else {
    console.error('Snackbar not initialized');
  }
};
