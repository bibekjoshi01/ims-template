import { useState, useCallback, useEffect } from 'react';
import { GridFilterModel, GridPaginationModel, GridSortModel, GridRowId } from '@mui/x-data-grid';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useAppDispatch } from '@/libs/hooks';

/**
 * Configuration options for creating a table data hook
 *
 * @template TData - The transformed row data type (what appears in the table)
 * @template TApiResponse - The API response data type
 * @template TUpdateInput - The data type for update operations
 */
export interface CreateTableHookOptions<TData, TApiResponse, TUpdateInput = Partial<TData>> {
  /**
   * The RTK Query hook for fetching list data
   */
  useListQuery: any;

  /**
   * The RTK Query hook for updating an item
   */
  useUpdateMutation?: any;

  /**
   * The RTK Query hook for deleting an item
   */
  useDeleteMutation?: any;

  /**
   * Function to transform API response data to table row format
   *
   * @param apiData - The data returned from the API
   * @returns Transformed data for table rows
   */
  transformResponseToTableData: (apiData: TApiResponse) => TData[];

  /**
   * Function to transform table data to API update format
   *
   * @param rowData - The row data from the table
   * @returns Data formatted for the update API
   */
  transformTableDataToUpdateInput?: (rowData: TData, detailData?: any) => TUpdateInput;

  /**
   * Default page size options
   * @default [5, 10, 25, 50, 100]
   */
  defaultPageSizeOptions?: number[];

  /**
   * Default page size
   * @default 10
   */
  defaultPageSize?: number;

  /**
   * Function to set the ID of the row being edited
   */
  setId?: (id: GridRowId) => void;

  /**
   * Function to set the edit state
   */
  setEdit?: (value: boolean) => void;

  /**
   * Function to set the ID of the row being viewed
   */
  setViewId?: (id: GridRowId) => void;
}

/**
 * Creates a custom hook for managing data table state and API interactions
 *
 * @template TData - The transformed row data type (what appears in the table)
 * @template TApiResponse - The API response data type
 * @template TUpdateInput - The data type for update operations
 *
 * @param options - Configuration options for the hook
 * @returns A hook function for managing table data
 */
export function createTableDataHook<TData extends object, TApiResponse, TUpdateInput = Partial<TData>>(
  options: CreateTableHookOptions<TData, TApiResponse, TUpdateInput>
) {
  const {
    useListQuery,
    useUpdateMutation,
    useDeleteMutation,
    transformResponseToTableData,
    transformTableDataToUpdateInput,
    setId,
    setEdit,
    setViewId,
    defaultPageSizeOptions = [3, 5, 10, 25, 50, 100],
    defaultPageSize = 5
  } = options;

  /**
   * Custom hook for managing table data with API integration
   *
   * @param initialQueryParams - Optional initial query parameters
   * @returns An object with table state and handler functions
   */
  return function useTableData(initialQueryParams = {}) {
    // Query parameter state
    const [queryParams, setQueryParams] = useState({
      ...initialQueryParams,
      search: '',
      paginationModel: {
        page: 0,
        pageSize: defaultPageSize
      } as GridPaginationModel,
      sortModel: [] as GridSortModel,
      filterModel: {
        items: [],
        quickFilterValues: []
      } as GridFilterModel
    });

    // Get API hooks
    const { data, error, isFetching, refetch } = useListQuery(queryParams);
    const [updateItem] = useUpdateMutation ? useUpdateMutation() : [null];
    const [deleteItem] = useDeleteMutation ? useDeleteMutation() : [null];
    const dispatch = useAppDispatch();

    // Local state
    const [rows, setRows] = useState<TData[]>([]);
    const [totalRowsCount, setTotalRowsCount] = useState<number>(0);

    // Transform API data to table data
    useEffect(() => {
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      if (!data) return;
      const transformedData = transformResponseToTableData(data) || [];
      setRows([...transformedData]);
      setTotalRowsCount(data?.count ?? transformedData?.length ?? 0);
    }, [data, error]);

    // Event handlers
    const handlePaginationChange = useCallback((model: GridPaginationModel) => {
      setQueryParams((prev) => ({
        ...prev,
        paginationModel: model
      }));
    }, []);

    const handleSortChange = useCallback((model: GridSortModel) => {
      setQueryParams((prev) => ({
        ...prev,
        sortModel: model
      }));
    }, []);

    const handleFilterChange = useCallback((model: GridFilterModel) => {
      setQueryParams((prev) => ({
        ...prev,
        search: model.quickFilterValues?.[0] || '',
        filterModel: model
      }));
    }, []);
    /**
     * Handle row updates of inline editing.
     */
    const handleSave = useCallback(
      async (updatedRow: TData) => {
        if (!updateItem || !transformTableDataToUpdateInput) {
          console.warn('Update functionality not provided');
          return;
        }

        try {
          const id = (updatedRow as any).id;

          // Transform to API format
          const updateData = transformTableDataToUpdateInput(updatedRow);

          // Submit update
          const res = await updateItem({
            id: id,
            values: updateData
          }).unwrap();
          dispatch(setMessage({ message: res.message, variant: 'success' }));

          // NOTE - Refetch if needed
          refetch();
        } catch (error) {
          console.error('Failed to update row:', error);
          throw error;
        }
      },
      [updateItem, transformTableDataToUpdateInput, refetch, dispatch]
    );

    /**
     * Handle deleting a user
     */
    const handleDelete = useCallback(
      async (id: GridRowId) => {
        if (!deleteItem) {
          console.warn('Delete functionality not provided');
          return;
        }

        try {
          const res = await deleteItem(id).unwrap();
          dispatch(setMessage({ message: 'Deleted Successfully', variant: 'success' }));
          // NOTE - Refetch if needed
          refetch();
        } catch (error) {
          console.error('Error deleting:', error);
          dispatch(setMessage({ message: 'Failed to delete', variant: 'error' }));
          throw error;
        }
      },
      [deleteItem, refetch, dispatch]
    );

    /**
     * Handle edit button click
     * This will be attached to each row's edit action
     */
    const handleEditClick = useCallback(
      (id: GridRowId) => {
        if (setId) {
          setId(id);
        } else {
          console.warn('setId function is not provided');
        }

        if (setEdit) {
          setEdit(true);
        } else {
          console.warn('setEdit function is not provided');
        }
      },
      [setId, setEdit]
    );

    /**
     * Handle row update errors
     */
    const handleRowUpdateError = useCallback(
      (error: any) => {
        console.error('Error during row update:', error);
        dispatch(setMessage({ message: 'Error updating row', variant: 'error' }));
      },
      [dispatch]
    );

    const handleviewDetailsClick = useCallback(async (id: number | string | GridRowId) => {
      if (setViewId) {
        setViewId(id);
      } else {
        console.warn('setViewId function is not provided');
      }
    }, []);

    return {
      // Data
      rows,
      totalRowsCount,
      loading: isFetching,
      searchText: queryParams.search,
      // Models
      paginationModel: queryParams.paginationModel,
      filterModel: queryParams.filterModel,
      sortModel: queryParams.sortModel,
      pageSizeOptions: defaultPageSizeOptions,

      // Handlers
      handleSave,
      handleDelete,
      handleEditClick,
      handleviewDetailsClick,
      handleRowUpdateError,
      handlePaginationChange,
      handleSortChange,
      handleFilterChange,

      // Raw access
      refetch,
      error
    };
  };
}
