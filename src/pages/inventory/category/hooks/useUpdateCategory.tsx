// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import { uniqueFieldNames } from '../components/create-form/config';
import {
  categoryUpdateFields,
  categoryUpdateFormSchema,
  defaultValues,
  TCategoryUpdateFormDataType
} from '../components/update-form/config';
import { ICategoryUpdateFormProps } from '../components/update-form/Form';
import { useLazyGetCategoriesQuery, usePatchCategoryMutation } from '../redux/category.api';

const useUpdateCategory = ({ categoryData, onClose }: ICategoryUpdateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateCategory] = usePatchCategoryMutation();
  const [triggerGetCategory] = useLazyGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm<TCategoryUpdateFormDataType>({
    resolver: zodResolver(categoryUpdateFormSchema),
    defaultValues
  });

  // NOTE - For Unique field validation
  const uniqueFieldValues = {
    code: watch('code')
  };

  const fetchCategory = useCallback((args: any) => triggerGetCategory(args).unwrap(), [triggerGetCategory]);
  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: categoryData?.id ?? null,
    triggerFunc: fetchCategory,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  // Reset form with category data when it's available
  useEffect(() => {
    if (categoryData) {
      reset(categoryData);
    }
  }, [categoryData, reset]);

  // This is for form update not for inline update
  const onSubmit = async (data: TCategoryUpdateFormDataType) => {
    const { id, ...values } = data;
    try {
      const payload = {
        id,
        values
      };
      const res = await updateCategory(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TCategoryUpdateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          name: 'name',
          code: 'code',
          icon: 'icon',
          isActive: 'isActive'
        }
      });
    }
  };

  return {
    handleSubmit: () => handleSubmit(onSubmit),
    control,
    errors,
    categoryUpdateFields
  };
};

export default useUpdateCategory;
