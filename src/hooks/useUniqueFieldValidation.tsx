import isEqual from 'fast-deep-equal';
import { debounce } from '@/utils/functions/debounce';
import { useEffect, useRef, useCallback } from 'react';
import { camelCaseToNormal } from '@/utils/functions/formatString';

interface Results {
  id?: number;
  [key: string]: any;
}

interface UseUniqueFieldValidationProps<T> {
  fields: (keyof T)[];
  values: Partial<T>;
  id?: number | null;
  triggerFunc: (args: any) => Promise<{ count: number; results: Results[] }>;
  setError: (field: keyof T, message: string) => void;
  debounceDelay?: number;
}

export default function useUniqueFieldValidation<T>({
  fields,
  values,
  id = null,
  triggerFunc,
  setError,
  debounceDelay = 500
}: UseUniqueFieldValidationProps<T>) {
  // To prevents unnecessary API calls if the values/errors hasn’t changed.
  const previousValues = useRef<Partial<T>>({});
  const previousErrors = useRef<Record<string, string>>({});

  /**
   * Debounced validation function, this will be called when the user types in the unique fields.
   * It will check if the value is unique by calling the API and set the error message accordingly.
   */
  const validateField = useCallback(
    debounce(async (field: keyof T, value: any) => {
      try {
        const response = await triggerFunc({
          search: '',
          paginationModel: { page: 0, pageSize: 1 },
          sortModel: [],
          filterModel: { items: [{ field, operator: 'equal', value }] }
        });

        // NOTE - if response.count === 0, the field is unique
        let isValid = response.count === 0;

        // If response.count is 1, check if the id matches the current id
        if (response.count === 1 && id) {
          isValid = response.results[0]?.id == id;
        }

        const errorMsg = isValid ? '' : `${camelCaseToNormal(String(field))} already exists`;

        // if current error message is same as previous error message, do not set error
        if (previousErrors.current[field as string] !== errorMsg) {
          setError(field, errorMsg);
          previousErrors.current[field as string] = errorMsg;
        }
      } catch (error) {
        console.error('Validation error:', error);
      }
    }, debounceDelay),
    [triggerFunc, setError, debounceDelay]
  );

  useEffect(() => {
    // The fields array is iterated over to validate each field.
    fields.forEach((field) => {
      // current value of field
      const value = values[field];

      // Skip if value of field hasn't changed
      if (isEqual(previousValues.current[field], value)) return;

      // Update previous value to current value
      previousValues.current[field] = value;

      // Clear error for empty values
      if (!value) {
        if (previousErrors.current[field as string]) {
          setError(field, '');
          previousErrors.current[field as string] = '';
        }
        return;
      }

      // Trigger validation for non-empty values
      validateField(field, value);
    });

    return () => {
      // Ensures that all pending validations are cancelled when dependencies change,
      // preventing unwanted API calls.
      validateField.cancel();
    };
  }, [fields, values, validateField]);
}
