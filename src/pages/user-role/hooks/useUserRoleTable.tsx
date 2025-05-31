import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { TableData } from '../components/listing/config';
import { useArchiveUserRoleMutation, useGetRolesQuery, usePatchUserRoleMutation } from '../redux/user-role.api';
import { currentUserRoleId, setEdit, setViewId } from '../redux/user-role.slice';

/**
 * Custom hook for User table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the User table
 */
export const useUserRoleTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<TableData, any>({
    // RTK Query hooks
    useListQuery: useGetRolesQuery,
    useUpdateMutation: usePatchUserRoleMutation,
    useDeleteMutation: useArchiveUserRoleMutation,

    // Set the id of the user being edited
    setId: (id) => {
      dispatch(currentUserRoleId(id));
    },

    // set if edit mode is active
    setEdit: (value) => {
      dispatch(setEdit(value));
    },

    // set the id of the user being viewed
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
