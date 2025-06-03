import { useMemo } from 'react';
import { SelectOption } from '@/components/app-form/types';
import { useGetProductCategoriesQuery } from '../redux/product.api';

export const useProductCategories = () => {
  const args = {
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: [],
    filterModel: { items: [] }
  };

  const { data: productCategoriesData } = useGetProductCategoriesQuery(args);

  const productCategoriesOptions = useMemo<SelectOption[]>(() => {
    return (
      productCategoriesData?.results?.map((category) => ({
        label: category.name,
        value: category.id
      })) || []
    );
  }, [productCategoriesData]);

  return productCategoriesOptions;
};
