import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { ITableData } from '../components/listing/config';
import { useArchiveProductMutation, useGetProductsQuery, usePatchProductMutation } from '../redux/product.api';
import { currentProductId, setEdit, setViewId } from '../redux/product.slice';
import { useProductCategories } from './useProductCategories';
import { useProductUnits } from './useProductUnits';
import { IProductCreatePayload, IProductList } from '../redux/types';
import React from 'react';

/**
 * Custom hook for Product table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the Product table
 */
export const useCategoryTable = () => {
  const dispatch = useAppDispatch();
  const { productCategoriesOptions, isLoading: isLoadingCategories } = useProductCategories();
  const { productUnitsOptions, isLoading: isLoadingUnits } = useProductUnits();

  const isOptionsLoaded = !isLoadingCategories && !isLoadingUnits;

  // Call the hook once
  const tableDataHook = createTableDataHook<ITableData, IProductList, IProductCreatePayload>({
    useListQuery: useGetProductsQuery,
    useUpdateMutation: usePatchProductMutation,
    useDeleteMutation: useArchiveProductMutation,

    setId: (id) => {
      dispatch(currentProductId(id));
    },
    setEdit: (value) => {
      dispatch(setEdit(value));
    },
    setViewId: (id) => {
      dispatch(setViewId(id));
    },

    transformResponseToTableData: (apiData) => {
      if (!isOptionsLoaded) return [];

      return apiData.results.map((data) => ({
        ...data,
        category: productCategoriesOptions.find((opt) => opt.value === data.category)?.label || 'Unknown Category',
        unit: productUnitsOptions.find((opt) => opt.value === data.unit)?.label || 'Unknown Unit'
      }));
    },

    transformTableDataToUpdateInput: (rowData) => {
      return rowData as unknown as IProductCreatePayload;
    }
  });

  // Destructure refetch from the hook return
  const { refetch } = tableDataHook();

  // Refetch when options are loaded
  React.useEffect(() => {
    if (isOptionsLoaded) {
      refetch();
    }
  }, [isOptionsLoaded, refetch]);

  return tableDataHook;
};
