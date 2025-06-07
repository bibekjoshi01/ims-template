import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { ICustomerCreatePayload } from '../redux/types';

import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useCreateCustomerMutation, useLazyGetCustomersQuery } from '../redux/customer.api';

import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { handleClientError } from '@/utils/functions/handleError';
import { useCallback } from 'react';
import { ICustomerCreateFormProps } from '../components/create-form';
import {
  customerCreateFormSchema,
  customerCreateFields,
  defaultValues,
  TCustomerCreateFormDataType,
  uniqueFieldNames
} from '../components/create-form/config';

const useCreateCustomer = ({ onClose }: ICustomerCreateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createCustomer] = useCreateCustomerMutation();
  const [triggerGetCustomer] = useLazyGetCustomersQuery();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<TCustomerCreateFormDataType>({
    resolver: zodResolver(customerCreateFormSchema),
    defaultValues
  });

  // NOTE - For Unique field validation
  const uniqueFieldValues = {
    email: watch('email'),
    phoneNo: watch('phoneNo')
  };

  const fetchCustomer = useCallback((args: any) => triggerGetCustomer(args).unwrap(), [triggerGetCustomer]);
  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: null,
    triggerFunc: fetchCustomer,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  // NOTE - Form submit handler
  const onSubmit = async (data: TCustomerCreateFormDataType) => {
    try {
      const payload: ICustomerCreatePayload = {
        ...data
      };
      const res = await createCustomer(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TCustomerCreateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          fullName: 'fullName',
          gender: 'gender',
          addresses: 'addresses',
          email: 'email',
          phoneNo: 'phoneNo',
          altPhoneNo: 'altPhoneNo',
          isPerson: 'isPerson',
          notes: 'notes',
          isActive: 'isActive',
          photo: 'photo'
        }
      });
    }
  };

  return {
    handleSubmit: () => handleSubmit(onSubmit),
    control,
    errors,
    watch,
    customerCreateFields
  };
};

export default useCreateCustomer;
