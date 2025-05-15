import { SnackbarKey, VariantType } from 'notistack';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

type ErrorResponse = Record<string, string[] | string> | { error: string | string[] };

interface HandleClientErrorParams<T extends FieldValues> {
  error: any;
  setError: UseFormSetError<T>;
  enqueueSnackbar: (message: string, options?: { variant: VariantType }) => SnackbarKey;
  fieldKeyMap?: Record<string, keyof T>;
  defaultErrorMessage?: string;
}

export function handleClientError<T extends FieldValues>({
  error,
  setError,
  enqueueSnackbar,
  fieldKeyMap = {},
  defaultErrorMessage = 'Something went wrong. Please try again.'
}: HandleClientErrorParams<T>) {
  const status = error?.status || error?.response?.status;

  // Only handle client errors
  if (!(status >= 400 && status < 500)) return;

  const errorData: ErrorResponse = error?.data;

  if (typeof errorData === 'object' && errorData !== null) {
    // Handle top-level "error"
    if ('error' in errorData) {
      const errorValue = errorData.error;
      const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

      if (typeof message === 'string') {
        enqueueSnackbar(message, { variant: 'error' });
        return;
      }
    }

    let hasFieldError = false;

    Object.entries(errorData).forEach(([key, value]) => {
      if (!value) return;

      const message = Array.isArray(value) ? value[0] : value;
      const formField = fieldKeyMap[key] ?? (key as keyof T);

      if (formField && typeof message === 'string') {
        setError(formField as Path<T>, {
          type: 'server',
          message
        });
        hasFieldError = true;
      }
    });

    if (!hasFieldError) {
      enqueueSnackbar(defaultErrorMessage, { variant: 'error' });
    }
  }
}
