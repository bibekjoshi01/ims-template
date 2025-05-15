import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// project imports
import { handleClientError } from '@/utils/functions/handleError';
import { changePasswordSchema, defaultValues } from '../change-passwod/changePasssword.config';
import { useChangePasswordMutation } from '../redux/account.api';
import { ChangePasswordFormDataType } from '../redux/types';

export const useChangePassword = () => {
  const [changePassword, { isLoading: loadingChangePassword }] = useChangePasswordMutation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues
  });

  const onSubmit = async (values: ChangePasswordFormDataType) => {
    try {
      const response = await changePassword({ values }).unwrap();
      enqueueSnackbar(response?.message, { variant: 'success' });
      reset(defaultValues);
    } catch (err: any) {
      handleClientError<ChangePasswordFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          oldPassword: 'currentPassword',
          newPassword: 'newPassword',
          confirmPassword: 'confirmPassword'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    loadingChangePassword,
    errors,
    reset,
    watch,
    control
  };
};
