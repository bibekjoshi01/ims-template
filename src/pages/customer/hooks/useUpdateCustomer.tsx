// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import { uniqueFieldNames } from '../components/create-form/config';
import {
  Address,
  customerUpdateFields,
  customerUpdateFormSchema,
  defaultValues,
  TCustomerUpdateFormDataType
} from '../components/update-form/config';
import { ICustomerUpdateFormProps } from '../components/update-form/Form';
import { useLazyGetCustomersQuery, usePatchCustomerMutation, useArchiveCustomerAddressMutation } from '../redux/customer.api';
import { TField } from '@/components/app-form/types';

const useUpdateCustomer = ({ customerData, onClose }: ICustomerUpdateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateCustomer] = usePatchCustomerMutation();
  const [triggerGetCustomer] = useLazyGetCustomersQuery();
  const [archiveCustomerAddress] = useArchiveCustomerAddressMutation();
  const [formFields, setFormFields] = useState(customerUpdateFields);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm<TCustomerUpdateFormDataType>({
    resolver: zodResolver(customerUpdateFormSchema),
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
    id: customerData?.id ?? null,
    triggerFunc: fetchCustomer,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  const handleDeleteAddress = async (index: number, address_id: number | undefined) => {
    if (!customerData?.id || !address_id) return;

    try {
      await archiveCustomerAddress({ id: customerData.id, address_id }).unwrap();
      enqueueSnackbar('Address archived successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to archive address', { variant: 'error' });
      console.error('Archive error:', error);
    }
  };

  // Reset form with customer data when it's available
  useEffect(() => {
    if (customerData) {
      reset(customerData);
    }
  }, [customerData, reset]);

  useEffect(() => {
    const updatedFields = customerUpdateFields.map((f) =>
      f.name === 'addresses'
        ? {
            ...f,
            onDelete: (index: number, field: TField<Address>) => handleDeleteAddress(index, field?.id)
          }
        : f
    );
    setFormFields(updatedFields);
  }, [customerData]);

  // This is for form update not for inline update
  const onSubmit = async (data: TCustomerUpdateFormDataType) => {
    const { id, ...values } = data;
    try {
      const payload = {
        id,
        values
      };
      const res = await updateCustomer(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TCustomerUpdateFormDataType>({
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
    formFields
  };
};

export default useUpdateCustomer;
