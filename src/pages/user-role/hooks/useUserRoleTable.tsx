import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { TableData } from '../components/userRoleListingTable.config';
import { useGetUserRolesQuery, usePatchUserRoleMutation } from '../redux/user-role.api';
import { currentUserRoleId, setEdit } from '../redux/user-role.slice';

/**
 * Custom hook for User table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the User table
 */
export const useUserRoleTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<TableData, any>({
    // RTK Query hooks
    useListQuery: useGetUserRolesQuery,
    useUpdateMutation: usePatchUserRoleMutation,

    // Set the id of the user being edited
    setId: (id) => {
      dispatch(currentUserRoleId(id));
    },

    // set if edit mode is active
    setEdit: (value) => {
      dispatch(setEdit(value));
    },

    // NOTE - Data transformations api data to table data
    transformResponseToTableData: (apiData) => {
      return apiData.results;
    },

    // NOTE - Data transformations table data to api data of inline update
    transformTableDataToUpdateInput: (rowData) => {
      return rowData;
    }
  });
};
