import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { IProductCreatePayload } from '../redux/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useCreateProductMutation, useLazyGetProductsQuery } from '../redux/product.api';

import { useCallback, useMemo, useState } from 'react';
import { handleClientError } from '@/utils/functions/handleError';
import { IProductCreateFormProps } from '../components/create-form';
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import {
  productCreateFormSchema,
  productCreateFields,
  defaultValues,
  TProductCreateFormDataType,
  uniqueFieldNames
} from '../components/create-form/config';
import { useProductUnits } from './useProductUnits';
import { useProductCategories } from './useProductCategories';

const useCreateProduct = ({ onClose }: IProductCreateFormProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createProduct] = useCreateProductMutation();
  const [triggerGetProduct] = useLazyGetProductsQuery();
  const [formFields, setFormFields] = useState(productCreateFields);
  const productCategoriesOptions = useProductCategories();
  const productUnitsOptions = useProductUnits();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<TProductCreateFormDataType>({
    resolver: zodResolver(productCreateFormSchema),
    defaultValues
  });

  // NOTE - For Unique field validation
  const uniqueFieldValues = {
    sku: watch('sku')
  };

  const sellingPrice = watch('sellingPrice');
  console.log('sellingPrice', sellingPrice, typeof sellingPrice);

  const fetchProduct = useCallback((args: any) => triggerGetProduct(args).unwrap(), [triggerGetProduct]);
  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    id: null,
    triggerFunc: fetchProduct,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

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

  // NOTE - Form submit handler
  const onSubmit = async (data: TProductCreateFormDataType) => {
    try {
      const payload: IProductCreatePayload = { ...data };
      const res = await createProduct(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<TProductCreateFormDataType>({
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

export default useCreateProduct;
