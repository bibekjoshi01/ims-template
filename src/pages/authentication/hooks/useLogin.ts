import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// project imports
import { useAppDispatch } from '@/libs/hooks';
import { handleClientError } from '@/utils/functions/handleError';
import { useNavigate } from 'react-router-dom';
import { defaultValues } from '../components/login.config';
import { useLoginMutation } from '../redux/auth.api';
import { loginSuccess } from '../redux/auth.slice';
import { LoginFormDataType } from '../redux/types';

export const useLogin = () => {
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset
  } = useForm({ defaultValues });

  const onSubmit = async (values: LoginFormDataType) => {
    try {
      const response = await login({ values }).unwrap();
      dispatch(loginSuccess({ ...response }));
      enqueueSnackbar(response?.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
      reset(defaultValues);
      navigate('/');
    } catch (err: any) {
      handleClientError<LoginFormDataType>({
        error: err,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          persona: 'persona',
          password: 'password'
        }
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    loadingLogin,
    errors,
    reset,
    watch,
    control
  };
};
