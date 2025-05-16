import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// project imports
import { handleClientError } from '@/utils/functions/handleError';
import { defaultValues, resetPasswordSchema } from '../forget-password/resetPassword.config';
import { useResetPasswordMutation } from '../redux/auth.api';
import { ResetPasswordRequestFormDataType } from '../redux/types';

export const useResetPassword = () => {
  const [forgetPasswordReqeust, { isLoading: loadingResetPassword }] = useResetPasswordMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset
  } = useForm<ResetPasswordRequestFormDataType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues
  });

  const onSubmit = async (values: ResetPasswordRequestFormDataType) => {
    try {
      const response = await forgetPasswordReqeust({ values }).unwrap();
      enqueueSnackbar(response?.message, { variant: 'success' });
      reset(defaultValues);
      navigate('/');
    } catch (err: any) {
      // handle 400 error with key "error"
      const errorArray = err?.data?.error;
      if (Array.isArray(errorArray) && errorArray.length > 0) {
        const errorMessage = errorArray[0];
        enqueueSnackbar(errorMessage, { variant: 'error' });
        navigate('/forget-password');
        return;
      }
      // Field Specific error
      handleClientError<ResetPasswordRequestFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          newPassword: 'newPassword',
          confirmPassword: 'confirmPassword'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    loadingResetPassword,
    errors,
    reset,
    watch,
    control
  };
};
