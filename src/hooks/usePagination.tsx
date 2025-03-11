import { GridPaginationModel } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';

/**
 * Hook to manage pagination state and changes of datagrid appTable.
 */
export const usePagination = (pageSizeOptions: number[], onPaginationChange?: (model: GridPaginationModel) => void) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[1]
  });

  const handlePaginationChange = useCallback(
    (model: GridPaginationModel) => {
      setPaginationModel(model);
      onPaginationChange?.(model);
    },
    [onPaginationChange]
  );

  return { paginationModel, handlePaginationChange };
};
