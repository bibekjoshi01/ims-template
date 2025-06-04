import { createTableDataHook } from '@/hooks/createTableDataHook';
import { useAppDispatch } from '@/libs/hooks';
import { ITableData } from '../components/listing/config';
import { useArchiveCategoryMutation, useGetCategoriesQuery, usePatchCategoryMutation } from '../redux/category.api';
import { currentCategoryId, setEdit, setViewId } from '../redux/category.slice';

/**
 * Custom hook for Category table Fetching and updating
 *
 * Handles Table data fetching and inline updating through API's and data transformations for the Category table
 */
export const useCategoryTable = () => {
  const dispatch = useAppDispatch();

  return createTableDataHook<ITableData, any>({
    // RTK Query hooks
    useListQuery: useGetCategoriesQuery,
    useUpdateMutation: usePatchCategoryMutation,
    useDeleteMutation: useArchiveCategoryMutation,

    // Set the id of the category being edited
    setId: (id) => {
      dispatch(currentCategoryId(id));
    },

    // set if edit mode is active
    setEdit: (value) => {
      dispatch(setEdit(value));
    },

    // set the id of the category being viewed
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
