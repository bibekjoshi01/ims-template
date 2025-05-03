// MUI IMPORTS
import SaveAlt from '@mui/icons-material/SaveAlt';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, MuiEvent } from '@mui/x-data-grid';

//  Project Imports
import { usePagination } from '@/hooks/usePagination';
import { useTableHandlers } from '@/hooks/useTableHandlers';
import { useMemo } from 'react';
import { createColumnDefs } from './columns';
import { BoxStyles, TableStyles } from './styles';
import Toolbar, { CustomColumnsPanel, CustomFilterPanel } from './toolbar';
import { AppTableProps } from './types';

// ===========================|| AppTable - MAIN COMPONENT ||=========================== //
const AppTable = <T extends object>({
  // Table metadata
  title,

  // Column configuration
  initialRows = [],
  getColumnConfig,

  // Handlers
  onSaveRow,
  onDeleteRow,

  // loading state
  loading = false,
  handleRowUpdateError,

  // Display options
  showCellVerticalBorder = false,
  showSearch = true,
  showColumnFilter = false,
  showFilter = false,
  showDensitySelector = false,
  showExport = false,

  // Table functionalities
  allowSorting = true,
  allowEditing = false,
  editMode = 'row',
  enableColumnResizing = false,
  enableRowSelection = false,

  // Pagination
  pageSizeOptions = [5, 10, 15, 20],
  serverPagination = false,

  // Exporting
  exportFileName = 'table_data',

  // Row identification
  getRowId,

  // container styles
  containerSx,

  ...dataGridProps
}: AppTableProps<T>) => {
  const theme = useTheme();
  console.log(theme);
  // Pagination hook
  const { paginationModel, handlePaginationChange } = usePagination(pageSizeOptions);

  // Manage table state and handlers
  const { rows, rowModesModel, setRowModesModel, savingRows, handlers } = useTableHandlers<T>(initialRows, onSaveRow, onDeleteRow);

  // Generate column configuration using provided function and theme
  const columnConfig = useMemo(() => getColumnConfig(theme), [getColumnConfig, theme]);

  // Generate columns using provided createColumns function
  const columns = useMemo(
    () => createColumnDefs<T>(columnConfig, theme, handlers, rowModesModel, savingRows),
    [columnConfig, theme, handlers, rowModesModel, savingRows]
  );

  return (
    <Box sx={{ ...BoxStyles, ...containerSx }}>
      <DataGrid
        // rest props
        {...dataGridProps}
        // Table metadata
        sx={TableStyles}
        columns={columns}
        rows={rows}
        loading={loading}
        // Editing functionalities
        editMode={allowEditing ? editMode : undefined}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={handlers.processRowUpdate}
        onProcessRowUpdateError={handleRowUpdateError}
        // Display options
        showCellVerticalBorder={showCellVerticalBorder}
        checkboxSelection={enableRowSelection}
        // Pagination
        paginationMode={serverPagination ? 'server' : 'client'}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={pageSizeOptions}
        rowCount={serverPagination ? rows?.length : undefined}
        // Sorting and filtering
        sortingMode={allowSorting ? 'client' : undefined}
        getRowId={getRowId || ((row: T) => (row as any).id)}
        // Toolbar
        slots={{
          toolbar: () => (
            <Toolbar
              title={title}
              showSearch={showSearch}
              showColumnFilter={showColumnFilter}
              showFilter={showFilter}
              showDensitySelector={showDensitySelector}
              showExport={showExport}
            />
          ),
          filterPanel: CustomFilterPanel,
          columnsPanel: CustomColumnsPanel,
          exportIcon: SaveAlt
        }}
        slotProps={{
          // shows skeleton loader when loading
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton'
          },

          // update the filter panel looks
          filterPanel: {
            filterFormProps: {
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { width: 180 }
                }
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { width: 180 }
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { width: 120 }
              }
            },
            sx: {
              '& .MuiDataGrid-filterForm': {
                gap: 2,
                p: 2,
                alignItems: 'center'
              }
            }
          }
        }}
        // Density selector
        initialState={{ density: 'comfortable' }}
        // prevent enter key from triggering save while editing
        onCellKeyDown={(params, event) => {
          if (params.cellMode === 'edit' && event.key === 'Enter') {
            // const activeElement = document.activeElement as HTMLElement;
            // Allow Enter key if focus is on the file input element
            // if (activeElement && (activeElement as HTMLInputElement).type === "file") return;

            // Block Enter only for other
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        // Prevents row edit mode from exiting on focus out
        onRowEditStop={(params: GridRowEditStopParams, event: MuiEvent) => {
          if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </Box>
  );
};

export default AppTable;
