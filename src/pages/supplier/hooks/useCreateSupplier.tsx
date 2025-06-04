import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import { ISupplierCreateFormProps } from '../components/create-form';
import {
  defaultValues,
  supplierCreateFormSchema,
  supplierInfoFields,
  TSupplierCreateFormDataType,
  uniqueFieldNames
} from '../components/create-form/config';
import { useCreateSupplierMutation, useLazyGetSuppliersQuery } from '../redux/supplier.api';
import { ISupplierCreatePayload } from '../redux/types';

const useCreateSupplier = ({ onClose }: ISupplierCreateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // RTK Query mutation and lazy query hooks
  const [createSupplier] = useCreateSupplierMutation();
  const [triggerGetSupplier] = useLazyGetSuppliersQuery();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<TSupplierCreateFormDataType>({
    resolver: zodResolver(supplierCreateFormSchema),
    defaultValues
  });

  // Gather current values of unique fields for validation
  const uniqueFieldValues = uniqueFieldNames.reduce(
    (acc, fieldName) => {
      acc[fieldName] = watch(fieldName);
      return acc;
    },
    {} as Record<keyof TSupplierCreateFormDataType, any>
  );

  // Function to fetch suppliers for uniqueness check
  const fetchSupplier = useCallback((args: any) => triggerGetSupplier(args).unwrap(), [triggerGetSupplier]);

  // Custom hook for unique field validation with debounce
  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: null, // null because this is creation, no existing id
    triggerFunc: fetchSupplier,
    setError: (field, message) => {
      if (message) setError(field as keyof TSupplierCreateFormDataType, { type: 'manual', message });
      else clearErrors(field as keyof TSupplierCreateFormDataType);
    },
    debounceDelay: 100
  });

  // Form submit handler
  const onSubmit = async (data: TSupplierCreateFormDataType) => {
    try {
      const payload: ISupplierCreatePayload = {
        ...data,
        altPhoneNo: data.altPhoneNo ?? '',
        website: data.website ?? '',
        taxId: data.taxId ?? '',
        email: data.email ?? '',
        address: data.address ?? '',
        country: data.country ?? ''
      };
      const res = await createSupplier(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TSupplierCreateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          name: 'name',
          contactPerson: 'contactPerson',
          email: 'email',
          phoneNo: 'phoneNo',
          altPhoneNo: 'altPhoneNo',
          address: 'address',
          country: 'country',
          website: 'website',
          taxId: 'taxId',
          isActive: 'isActive',
          notes: 'notes'
        }
      });
    }
  };

  return {
    handleSubmit: () => handleSubmit(onSubmit),
    control,
    errors,
    supplierInfoFields
  };
};

export default useCreateSupplier;
