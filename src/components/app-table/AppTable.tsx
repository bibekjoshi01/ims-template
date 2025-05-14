// MUI IMPORTS
import SaveAlt from '@mui/icons-material/SaveAlt';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, GridRowParams, MuiEvent } from '@mui/x-data-grid';

//  Project Imports
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
  totalRows = 0,
  getColumnConfig,

  // Handlers
  onSaveRow,
  onDeleteRow,
  handleEditClick,
  onViewDetailsClick,

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

  // Pagination, Sorting and filtering
  paginationMode = 'server',
  sortingMode = 'server',
  filterMode = 'server',

  // Models
  paginationModel = { page: 0, pageSize: 10 },
  sortModel = [],
  filterModel = {
    items: []
  },

  // Pagination options
  pageSizeOptions = [3, 5, 10, 20, 50, 100],

  // Handlers
  handleSortChange,
  handleFilterChange,
  handlePaginationChange,

  // Search
  handleSearchChange,

  // Exporting
  exportFileName = 'table_data',

  // Row identification
  getRowId,

  // create new user form
  createNewForm,
  createButtonTitle,

  // container styles
  containerSx,

  ...dataGridProps
}: AppTableProps<T>) => {
  const theme = useTheme();

  // Manage table state and handlers
  const { rows, rowModesModel, setRowModesModel, savingRows, handlers } = useTableHandlers<T>(
    initialRows,
    onSaveRow,
    onDeleteRow,
    onViewDetailsClick,
    handleEditClick
  );

  // Generate column configuration using provided function and theme
  const columnConfig = useMemo(() => getColumnConfig(theme), [getColumnConfig, theme]);

  // Generate columns using provided createColumns function
  const columns = useMemo(
    () => createColumnDefs<T>(columnConfig, theme, handlers, rowModesModel, savingRows),
    [columnConfig, theme, handlers, rowModesModel, savingRows]
  );

  const memoizedToolbar = useMemo(
    () => () => (
      <Toolbar
        title={title}
        showSearch={showSearch}
        filterMode={filterMode}
        handleSearchChange={handleSearchChange}
        showColumnFilter={showColumnFilter}
        showFilter={showFilter}
        showDensitySelector={showDensitySelector}
        showExport={showExport}
        createNewForm={createNewForm}
        createButtonTitle={createButtonTitle}
      />
    ),
    [title, showSearch, filterMode, handleSearchChange, showColumnFilter, showFilter, showDensitySelector, showExport, createNewForm]
  );

  const handleRowDoubleClick = (params: GridRowParams) => {
    handlers.editInline(params.id);
  };

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
        onRowDoubleClick={handleRowDoubleClick}
        // Display options
        showCellVerticalBorder={showCellVerticalBorder}
        checkboxSelection={enableRowSelection}
        // Pagination Sorting and filtering
        // Mode
        paginationMode={paginationMode}
        sortingMode={sortingMode}
        filterMode={filterMode}
        // Models
        paginationModel={paginationMode === 'server' ? paginationModel : undefined}
        filterModel={filterMode === 'server' ? filterModel : undefined}
        sortModel={sortingMode === 'server' ? sortModel : undefined}
        // Handlers
        onSortModelChange={handleSortChange}
        onFilterModelChange={handleFilterChange}
        onPaginationModelChange={handlePaginationChange}
        // options
        pageSizeOptions={pageSizeOptions}
        rowCount={paginationMode == 'server' ? totalRows : rows?.length}
        getRowId={getRowId || ((row: T) => (row as any).id)}
        // Toolbar
        slots={{
          toolbar: memoizedToolbar,
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
                sx: { width: 120, display: 'none' }
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
        initialState={{
          ...dataGridProps.initialState,
          filter: {
            ...dataGridProps.initialState?.filter,
            quickFilterValues: []
          },
          density: 'comfortable'
        }}
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
