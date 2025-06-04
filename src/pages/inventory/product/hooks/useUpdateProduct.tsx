// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import { uniqueFieldNames } from '../components/create-form/config';
import { productUpdateFields, productUpdateFormSchema, defaultValues, TProductUpdateFormDataType } from '../components/update-form/config';
import { IProductUpdateFormProps } from '../components/update-form/Form';
import { useLazyGetProductsQuery, usePatchProductMutation } from '../redux/product.api';
import { useProductCategories } from './useProductCategories';
import { useProductUnits } from './useProductUnits';

const useUpdateProduct = ({ productData, onClose }: IProductUpdateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateProduct] = usePatchProductMutation();
  const [triggerGetProduct] = useLazyGetProductsQuery();
  const [formFields, setFormFields] = useState(productUpdateFields);
  const productCategoriesOptions = useProductCategories();
  const productUnitsOptions = useProductUnits();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm<TProductUpdateFormDataType>({
    resolver: zodResolver(productUpdateFormSchema),
    defaultValues
  });

  // NOTE - For Unique field validation
  const uniqueFieldValues = {
    sku: watch('sku')
  };

  const fetchCategory = useCallback((args: any) => triggerGetProduct(args).unwrap(), [triggerGetProduct]);
  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: productData?.id ?? null,
    triggerFunc: fetchCategory,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  // Reset form with category data when it's available
  useEffect(() => {
    if (productData) {
      reset({
        ...productData,
        sellingPrice: Number(productData.sellingPrice) ?? 0,
        category: productData.category?.id ?? null,
        unit: productData.unit?.id ?? null
      });
    }
  }, [productData, reset]);

  useMemo(() => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.name === 'category') {
          return { ...field, options: productCategoriesOptions };
        }
        if (field.name === 'unit') {
          return { ...field, options: productUnitsOptions };
        }
        return field;
      })
    );
  }, [productCategoriesOptions, productUnitsOptions]);

  // This is for form update not for inline update
  const onSubmit = async (data: TProductUpdateFormDataType) => {
    const { id, ...values } = data;
    try {
      const payload = {
        id,
        values
      };
      const res = await updateProduct(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TProductUpdateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          name: 'name',
          sku: 'sku',
          category: 'category',
          unit: 'unit',
          sellingPrice: 'sellingPrice',
          stockAlertQty: 'stockAlertQty',
          barcode: 'barcode',
          description: 'description',
          image: 'image'
        }
      });
    }
  };

  return {
    handleSubmit: () => handleSubmit(onSubmit),
    control,
    errors,
    formFields
  };
};

export default useUpdateProduct;
