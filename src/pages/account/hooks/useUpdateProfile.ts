import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// project imports
import { handleClientError } from '@/utils/functions/handleError';
import { useEffect } from 'react';
import { defaultValues, UpdateProfileFormDataType, updateProfileSchema } from '../profile/profile.config';
import { useUpdateProfileMutation } from '../redux/account.api';

export const useUpdateProfile = (initialData?: UpdateProfileFormDataType) => {
  const { enqueueSnackbar } = useSnackbar();

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
    reset
  } = useForm<UpdateProfileFormDataType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: defaultValues
  });

  // Set default values from profile data
  useEffect(() => {
    if (initialData) {
      reset({ ...initialData });
    }
  }, [initialData, reset]);

  const onSubmit = async (values: UpdateProfileFormDataType, onSuccess?: () => void) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'photo') {
          if (value && value instanceof File) {
            formData.append(key, value);
          } else if (!value) {
            formData.append(key, '');
          }
        } else {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });

      const response = await updateProfile({ values: formData }).unwrap();
      enqueueSnackbar(response?.message, { variant: 'success' });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      handleClientError<UpdateProfileFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          firstName: 'firstName',
          lastName: 'lastName',
          phoneNo: 'phoneNo',
          photo: 'photo'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    setValue,
    loadingUpdateProfile,
    errors,
    reset,
    watch,
    control
  };
};
