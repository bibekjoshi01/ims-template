import { SnackbarKey, VariantType } from 'notistack';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

type ErrorResponse = Record<string, string[] | string> | { error: string | string[] };

interface HandleClientErrorParams<T extends FieldValues> {
  error: any;
  setError: UseFormSetError<T>;
  enqueueSnackbar: (message: string, options?: { variant: VariantType }) => SnackbarKey;
  fieldKeyMap?: Record<string, Path<T>>;
  defaultErrorMessage?: string;
}

function parseNestedErrors<T>(data: any, parentKey = '', fieldKeyMap: Record<string, Path<T>> = {}): [Path<T>, string][] {
  const errors: [Path<T>, string][] = [];

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const arrayKey = `${parentKey}${parentKey ? '.' : ''}${index}`;
      errors.push(...parseNestedErrors(item, arrayKey, fieldKeyMap));
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = `${parentKey}${parentKey ? '.' : ''}${key}`;

      if (Array.isArray(value) && typeof value[0] === 'string') {
        const mappedKey = fieldKeyMap[fullKey] ?? (fullKey as Path<T>);
        errors.push([mappedKey, value[0]]);
      } else {
        errors.push(...parseNestedErrors(value, fullKey, fieldKeyMap));
      }
    });
  }

  return errors;
}

export function handleClientError<T extends FieldValues>({
  error,
  setError,
  enqueueSnackbar,
  fieldKeyMap,
  defaultErrorMessage = 'Something went wrong. Please try again.'
}: HandleClientErrorParams<T>) {
  const status = error?.status ?? error?.response?.status;

  if (typeof status === 'number' && (status < 400 || status >= 500)) return;

  const errorData: ErrorResponse = error?.data ?? error?.response?.data ?? error;

  // Case 1: Flat error message (e.g., { error: "Something went wrong" })
  if (typeof errorData === 'object' && errorData !== null && 'error' in errorData) {
    const errorMsg = Array.isArray(errorData.error) ? errorData.error[0] : errorData.error;

    if (typeof errorMsg === 'string') {
      enqueueSnackbar(errorMsg, { variant: 'error' });
      return;
    }
  }

  // Case 2: Field-specific errors
  const parsedErrors = parseNestedErrors<T>(errorData, '', fieldKeyMap ?? {});
  let hasFieldError = false;

  parsedErrors.forEach(([field, message]) => {
    setError(field, { type: 'server', message });
    hasFieldError = true;
  });

  // Case 3: Unknown structure – show generic error
  if (!hasFieldError) {
    enqueueSnackbar(defaultErrorMessage, { variant: 'error' });
  }
}
