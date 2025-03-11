// MUI IMPORTS
import SaveAlt from '@mui/icons-material/SaveAlt';
import { Box } from '@mui/material';
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, MuiEvent } from '@mui/x-data-grid';

//  Project Imports
import { AppTableProps } from './types';
import { BoxStyles, TableStyles } from './styles';
import Toolbar, { CustomColumnsPanel, CustomFilterPanel } from './toolbar';
import { usePagination } from '@/hooks/usePagination';

// ===========================|| AppTable - MAIN COMPONENT ||=========================== //
const AppTable = <T extends object>({
  // Table metadata
  title,

  // Data handling
  columns,
  rows,
  loading = false,
  containerSx,

  // Editing functionalities
  rowModesModel,
  onRowModesModelChange,
  processRowUpdate,
  handleRowUpdateError,

  // Display options
  showCellVerticalBorder = false,
  showSearch = true,
  showColumnFilter = true,
  showFilter = true,
  showDensitySelector = true,
  showExport = true,

  // Table functionalities
  allowEditing = false,
  editMode = 'row',
  allowSorting = true,
  enableRowSelection = false,
  enableColumnResizing = false,

  // Pagination
  pageSizeOptions = [5, 10, 15, 20],
  serverPagination = false,
  totalRows = rows.length,
  onPaginationChange,

  // Exporting
  exportFileName = 'table_data',

  // Row identification
  getRowId,

  ...dataGridProps
}: AppTableProps<T>) => {
  // Pagination hook
  const { paginationModel, handlePaginationChange } = usePagination(pageSizeOptions, onPaginationChange);

  return (
    <Box sx={{ ...BoxStyles, ...containerSx }}>
      <DataGrid
        sx={TableStyles}
        columns={columns}
        rows={rows}
        loading={loading}
        // Editing functionalities
        editMode={allowEditing ? editMode : undefined}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleRowUpdateError}
        // Display options
        showCellVerticalBorder={showCellVerticalBorder}
        checkboxSelection={enableRowSelection}
        // Pagination
        paginationMode={serverPagination ? 'server' : 'client'}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={pageSizeOptions}
        rowCount={serverPagination ? totalRows : undefined}
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
        // Additional props
        {...dataGridProps}
      />
    </Box>
  );
};

export default AppTable;
