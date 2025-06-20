// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import {
  defaultValues,
  supplierUpdateFields,
  supplierUpdateFormSchema,
  TSupplierUpdateFormDataType,
  uniqueFieldNames
} from '../components/update-form/config';
import { ISupplierUpdateFormProps } from '../components/update-form/Form';
import { useLazyGetSuppliersQuery, usePatchSupplierMutation } from '../redux/supplier.api';
import { ISupplierUpdatePayload } from '../redux/types';

const useUpdateSupplier = ({ supplierData, onClose }: ISupplierUpdateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateSupplier] = usePatchSupplierMutation();
  const [triggerGetSupplier] = useLazyGetSuppliersQuery();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm<TSupplierUpdateFormDataType>({
    resolver: zodResolver(supplierUpdateFormSchema),
    defaultValues
  });

  // Gather current values of unique fields for validation
  const uniqueFieldValues = uniqueFieldNames.reduce(
    (acc, fieldName) => {
      acc[fieldName] = watch(fieldName);
      return acc;
    },
    {} as Record<keyof TSupplierUpdateFormDataType, any>
  );

  const fetchSupplier = useCallback((args: any) => triggerGetSupplier(args).unwrap(), [triggerGetSupplier]);

  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: supplierData?.id ?? null,
    triggerFunc: fetchSupplier,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 100
  });

  useEffect(() => {
    if (supplierData) {
      reset({
        ...supplierData,
        altPhoneNo: supplierData.altPhoneNo ?? '',
        website: supplierData.website ?? '',
        taxId: supplierData.taxId ?? ''
      });
    }
  }, [supplierData, reset]);

  const onSubmit = async (data: TSupplierUpdateFormDataType) => {
    const { id, ...values } = data;
    try {
      const payload: { id: number; values: ISupplierUpdatePayload } = {
        id,
        values: {
          ...values,
          altPhoneNo: data.altPhoneNo ?? '',
          website: data.website ?? '',
          taxId: data.taxId ?? '',
          email: data.email ?? '',
          address: data.address ?? '',
          country: data.country ?? ''
        }
      };
      const res = await updateSupplier(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TSupplierUpdateFormDataType>({
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
    supplierUpdateFields
  };
};

export default useUpdateSupplier;
