import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { ITableData } from '../components/listing/config';
import { useArchiveCustomerMutation, useGetCustomersQuery, usePatchCustomerMutation } from '../redux/customer.api';
import { setCurrentCustomerId, setEdit, setViewId } from '../redux/customer.slice';

/**
 * Custom hook for Customer table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the Customer table
 */
export const useCustomerTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<ITableData, any>({
    // RTK Query hooks
    useListQuery: useGetCustomersQuery,
    useUpdateMutation: usePatchCustomerMutation,
    useDeleteMutation: useArchiveCustomerMutation,

    // Set the id of the customer being edited
    setId: (id) => {
      dispatch(setCurrentCustomerId(id));
    },

    // set if edit mode is active
    setEdit: (value) => {
      dispatch(setEdit(value));
    },

    // set the id of the customer being viewed
    setViewId: (id) => {
      dispatch(setViewId(id));
    },

    // NOTE - Data transformations api data to table data
    transformResponseToTableData: (apiData) => {
      return apiData?.results;
    },

    // NOTE - Data transformations table data to api data of inline update
    transformTableDataToUpdateInput: (rowData) => {
      return rowData;
    }
  });
};
