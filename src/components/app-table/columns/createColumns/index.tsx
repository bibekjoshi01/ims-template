// MUI IMPORTS
import { Theme } from '@mui/material/styles';
import { GridColDef, GridRowId, GridRowModesModel, GridValidRowModel } from '@mui/x-data-grid';

// PROJECT IMPORTS
import { createActionsColumn } from './ActionColumn';
import { createDateColumn } from './DateColumn';
import { createImageColumn } from './ImageColumn';
import { createLinkColumn } from './LinkColumn';
import { createNumberColumn } from './NumberColumn';
import { createProgressColumn } from './ProgressColumn';
import { createSelectColumn } from './SelectColumn';
import { createTextColumn } from './TextColumn';

// TYPES
import { ColumnConfig, ColumnHandlers } from '../types';
import { createBooleanColumn } from './BooleanColumn';

/**
 * Generates column definitions for MUI DataGrid based on the provided configuration.
 *
 * @param columnConfig - Array of column configurations.
 * @param theme - The MUI theme for styling.
 * @param handlers - Event handlers for actions like delete, edit, save, etc.
 * @param rowModesModel - Row editing mode state.
 * @param savingRows - Sate for rows that are in saving state.
 * @returns Array of GridColDef objects for MUI DataGrid.
 */
const createColumnDefs = <T extends object>(
  columnConfig: ColumnConfig<T>[],
  theme: Theme,
  showIndex: boolean,
  handlers?: ColumnHandlers<T>,
  rowModesModel?: GridRowModesModel,
  savingRows?: Record<GridRowId, boolean>,
  allowEditing?: boolean,
  allowDeleting?: boolean
): GridColDef<T>[] => {
  // adding serial number
  if (showIndex) {
    columnConfig = [
      {
        field: 'index',
        headerName: '#',
        type: 'number',
        editable: false,
        maxWidth: 50,
        minWidth: 50,
        align: 'center',
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.id); // index on current page (0-based)
          const page = params.api.state.pagination.paginationModel.page;
          const pageSize = params.api.state.pagination.paginationModel.pageSize;
          return page * pageSize + rowIndex + 1;
        }
      },
      ...columnConfig
    ];
  }

  return columnConfig.map((config): GridColDef<T> => {
    // Extend GridColDef to allow custom properties like 'fieldType'
    type ExtendedGridColDef<T extends GridValidRowModel> = GridColDef<T> & { fieldType?: string };
    const baseCol: ExtendedGridColDef<T> = {
      field: config?.field as string,
      headerName: config?.headerName,
      align: config?.align ?? 'left',
      flex: 1, // fill the available space
      maxWidth: config?.maxWidth, // restrict the width if needed
      minWidth: config?.minWidth ?? 150,
      sortable: config?.sortable ?? false,
      filterable: config?.filterable ?? false,
      editable: config?.editable ?? true,
      renderCell: config?.renderCell,
      fieldType: config?.type || 'text'
    };
    switch (config.type) {
      case 'text':
        return createTextColumn<T>(config, theme, baseCol);
      case 'number':
        return createNumberColumn<T>(config, theme, baseCol);
      case 'select':
        return createSelectColumn<T>(config, theme, baseCol);
      case 'progress':
        return createProgressColumn<T>(baseCol);
      case 'image':
        return createImageColumn<T>(theme, baseCol);
      case 'date':
        return createDateColumn<T>(config, baseCol);
      case 'link':
        return createLinkColumn<T>(config, baseCol, rowModesModel);
      case 'boolean':
        return createBooleanColumn<T>(config, baseCol);
      case 'actions':
        return createActionsColumn<T>(config, theme, baseCol, handlers, rowModesModel, savingRows, allowEditing, allowDeleting);
      default:
        return baseCol;
    }
  });
};

export default createColumnDefs;
