import { useMemo } from 'react';
import { SelectOption } from '@/components/app-form/types';
import { useGetProductUnitsQuery } from '../redux/product.api';

export const useProductUnits = () => {
  const args = {
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: [],
    filterModel: { items: [] }
  };

  const { data: productUnitsData } = useGetProductUnitsQuery(args);

  const productUnitsOptions = useMemo<SelectOption[]>(() => {
    return (
      productUnitsData?.results?.map((unit) => ({
        label: unit.name,
        value: unit.id
      })) || []
    );
  }, [productUnitsData]);

  return productUnitsOptions;
};
