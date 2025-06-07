import { GridFilterModel, GridRowModel, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

export type ToolbarProps = React.ComponentPropsWithRef<typeof GridToolbarContainer> & {
  title?: string;
  showSearch: boolean;
  showColumnFilter: boolean;
  showFilter: boolean;
  showDensitySelector: boolean;
  showExport: boolean;
  exportFileName?: string;
  createNewForm?: (onClose: () => void) => React.ReactNode;
  createButtonTitle?: string;
};
