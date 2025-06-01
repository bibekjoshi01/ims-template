import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { combineName, splitName } from '@/utils/functions/splitCombineName';

import { TableData } from '../components/listing/config';
import { UserItem } from '../redux/types';
import { useArchiveUserMutation, useGetUsersQuery, usePatchUserMutation } from '../redux/user.api';
import { currentUserId, setEdit, setViewId } from '../redux/user.slice';

/**
 * Custom hook for User table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the User table
 */
export const useUserTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<TableData, any>({
    // RTK Query hooks
    useListQuery: useGetUsersQuery,
    useUpdateMutation: usePatchUserMutation,
    useDeleteMutation: useArchiveUserMutation,

    // Set the id of the user being edited
    setId: (id) => {
      dispatch(currentUserId(id));
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
      return apiData?.results.map((item: UserItem) => ({
        ...item,
        name: combineName(item?.firstName, item?.middleName, item?.lastName)
      }));
    },

    // NOTE - Data transformations table data to api data of inline update
    transformTableDataToUpdateInput: (rowData) => {
      const { firstName, lastName } = splitName(rowData?.name);

      return {
        firstName,
        lastName,
        isActive: rowData?.isActive,
        phoneNo: rowData?.phoneNo,
        photo: rowData?.photo
      };
    }
  });
};
