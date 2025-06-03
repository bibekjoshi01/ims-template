import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { ICategoryCreatePayload } from '../redux/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useCreateCategoryMutation, useLazyGetCategoriesQuery } from '../redux/category.api';

import { useCallback } from 'react';
import { handleClientError } from '@/utils/functions/handleError';
import { CategoryCreateFormProps } from '../components/create-form';
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import {
  defaultValues,
  categoryInfoFields,
  CategoryCreateFormDataType,
  categoryCreateFormSchema,
  uniqueFieldNames
} from '../components/create-form/config';

const useCreateCategory = ({ onClose }: CategoryCreateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory] = useCreateCategoryMutation();
  const [triggerGetCategory] = useLazyGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<CategoryCreateFormDataType>({
    resolver: zodResolver(categoryCreateFormSchema),
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
    id: null,
    triggerFunc: fetchCategory,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  // NOTE - Form submit handler
  const onSubmit = async (data: CategoryCreateFormDataType) => {
    try {
      const payload: ICategoryCreatePayload = { ...data };
      const res = await createCategory(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<CategoryCreateFormDataType>({
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
    categoryInfoFields
  };
};

export default useCreateCategory;
