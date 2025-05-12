import { GridPaginationModel } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';

/**
 * Hook to manage pagination state and changes of datagrid appTable.
 */
export const usePagination = () => {
  const pageSizeOptions = [5, 10, 20];

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[0]
  });

  const handlePaginationChange = useCallback((model: GridPaginationModel) => {
    setPaginationModel(model);
  }, []);

  return { paginationModel, handlePaginationChange };
};
