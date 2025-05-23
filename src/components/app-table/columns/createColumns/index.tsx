// MUI IMPORTS
import { GridColDef, GridRowId, GridRowModesModel } from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';

// PROJECT IMPORTS
import { createTextColumn } from './TextColumn';
import { createNumberColumn } from './NumberColumn';
import { createSelectColumn } from './SelectColumn';
import { createProgressColumn } from './ProgressColumn';
import { createActionsColumn } from './ActionColumn';
import { createImageColumn } from './ImageColumn';
import { createDateColumn } from './DateColumn';
import { createLinkColumn } from './LinkColumn';

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
  handlers?: ColumnHandlers<T>,
  rowModesModel?: GridRowModesModel,
  savingRows?: Record<GridRowId, boolean>
): GridColDef<T>[] => {
  return columnConfig.map((config): GridColDef<T> => {
    const baseCol: GridColDef<T> = {
      field: config?.field as string,
      headerName: config?.headerName,
      flex: 1, // fill the available space
      maxWidth: config?.maxWidth, // restrict the width if needed
      editable: config?.editable ?? true,
      filterable: config?.filterable ?? true,
      renderCell: config?.renderCell
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
        return createActionsColumn<T>(config, theme, baseCol, handlers, rowModesModel, savingRows);
      default:
        return baseCol;
    }
  });
};

export default createColumnDefs;
