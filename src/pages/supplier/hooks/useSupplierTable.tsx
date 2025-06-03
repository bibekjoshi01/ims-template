import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { ITableData } from '../components/listing/config';
import { useArchiveSupplierMutation, useGetSuppliersQuery, usePatchSupplierMutation } from '../redux/supplier.api';
import { setCurrentSupplierId, setEdit, setViewId } from '../redux/supplier.slice';

/**
 * Custom hook for Supplier table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the Supplier table
 */
export const useSupplierTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<ITableData, any>({
    useListQuery: useGetSuppliersQuery,
    useUpdateMutation: usePatchSupplierMutation,
    useDeleteMutation: useArchiveSupplierMutation,

    setId: (id) => {
      dispatch(setCurrentSupplierId(id));
    },

    setEdit: (value) => {
      dispatch(setEdit(value));
    },

    setViewId: (id) => {
      dispatch(setViewId(id));
    },

    transformResponseToTableData: (apiData) => {
      return apiData?.results;
    },

    transformTableDataToUpdateInput: (rowData) => {
      return rowData;
    }
  });
};
