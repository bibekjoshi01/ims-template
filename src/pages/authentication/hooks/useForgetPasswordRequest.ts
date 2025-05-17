import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// project imports
import { useAppDispatch } from '@/libs/hooks';
import { handleClientError } from '@/utils/functions/handleError';
import { defaultValues, forgetPasswordRequestSchema } from '../forget-password/forgetPasswordReqeust.config';
import { useForgetPasswordRequestMutation } from '../redux/auth.api';
import { setForgetPasswordEmailSent } from '../redux/auth.slice';
import { ForgetPasswordRequestFormDataType } from '../redux/types';

export const useForgetPasswordRequest = () => {
  const [forgetPasswordReqeust, { isLoading: loadingForgetPasswordRequest }] = useForgetPasswordRequestMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset
  } = useForm<ForgetPasswordRequestFormDataType>({
    resolver: zodResolver(forgetPasswordRequestSchema),
    defaultValues
  });

  const onSubmit = async (values: ForgetPasswordRequestFormDataType) => {
    try {
      const response = await forgetPasswordReqeust({ values }).unwrap();
      setSuccessMessage(response?.message || 'We have sent password recovery instructions to your email.');
      reset(defaultValues);
      dispatch(setForgetPasswordEmailSent());
    } catch (err: any) {
      handleClientError<ForgetPasswordRequestFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          email: 'email'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    loadingForgetPasswordRequest,
    errors,
    successMessage,
    reset,
    watch,
    control
  };
};
