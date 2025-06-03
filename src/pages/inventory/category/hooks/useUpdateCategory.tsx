import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useLazyGetCategoriesQuery, usePatchCategoryMutation } from '../redux/category.api';

import { useCallback, useEffect } from 'react';
import { handleClientError } from '@/utils/functions/handleError';
import { CategoryUpdateFormProps } from '../components/update-form/Form';
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { uniqueFieldNames } from '../components/create-form/config';
import {
  defaultValues,
  categoryUpdateFields,
  CategoryUpdateFormDataType,
  categoryUpdateFormSchema
} from '../components/update-form/config';

const useUpdateCategory = ({ categoryData, onClose }: CategoryUpdateFormProps) => {
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
  } = useForm<CategoryUpdateFormDataType>({
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
  const onSubmit = async (data: CategoryUpdateFormDataType) => {
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
      handleClientError<CategoryUpdateFormDataType>({
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
