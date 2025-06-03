// MUI IMPORTS
import SaveAlt from '@mui/icons-material/SaveAlt';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, GridRowParams, MuiEvent } from '@mui/x-data-grid';

//  Project Imports
import { Empty } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import Toolbar from './toolbar';
import SaveExport from '../export';
import { AppTableProps } from './types';
import { createColumnDefs } from './columns';
import { BoxStyles, TableStyles } from './styles';
import { useTableHandlers } from '@/hooks/useTableHandlers';
import ConfirmationModal from '../app-dialog/ConfirmationDialog';
import { CustomColumnsPanel, CustomFilterPanel } from './toolbar/Slots';

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
  showIndex = true,
  showCellVerticalBorder = false,
  showSearch = true,
  showColumnFilter = true,
  showFilter = false,
  showDensitySelector = false,
  showExport = false,

  // Table functionalities
  allowSorting = true,
  allowEditing = false,
  allowDeleting = true,
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
  const {
    rows,
    rowModesModel,
    setRowModesModel,
    savingRows,
    handlers,
    deleteDialogOpen,
    confirmDelete,
    cancelDelete,
    rowToDelete,
    isDeleting
  } = useTableHandlers<T>(initialRows, onSaveRow, onDeleteRow, onViewDetailsClick, handleEditClick);

  // Generate column configuration using provided function and theme
  const columnConfig = useMemo(() => getColumnConfig(theme), [getColumnConfig, theme, allowDeleting]);

  // Generate columns using provided createColumns function
  const columns = useMemo(
    () => createColumnDefs<T>(columnConfig, theme, showIndex, handlers, rowModesModel, savingRows, allowEditing, allowDeleting),
    [columnConfig, theme, handlers, rowModesModel, savingRows]
  );

  const SaveExportComponent = useMemo(() => <SaveExport columns={columns} rows={rows} title={title} />, [columns, rows, title]);

  const [searchText, setSearchText] = useState('');
  const handleInputChange = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const memoizedToolbar = useMemo(
    () => () => (
      <Toolbar
        title={title}
        showSearch={showSearch}
        handleTextChange={handleInputChange}
        searchText={searchText}
        filterMode={filterMode}
        handleSearchChange={handleSearchChange}
        showColumnFilter={showColumnFilter}
        showFilter={showFilter}
        showDensitySelector={showDensitySelector}
        showExport={showExport}
        createNewForm={createNewForm}
        saveExportComponent={SaveExportComponent}
        createButtonTitle={createButtonTitle}
      />
    ),
    [
      title,
      showSearch,
      filterMode,
      searchText,
      handleInputChange,
      handleSearchChange,
      showColumnFilter,
      showFilter,
      showDensitySelector,
      showExport,
      createNewForm,
      SaveExportComponent,
      createButtonTitle
    ]
  );

  const handleRowDoubleClick = (params: GridRowParams) => {
    if (allowEditing) {
      handlers.editInline(params.id);
    }
  };

  const DELETE_MESSAGE = (
    <Typography sx={{ fontSize: '1rem', fontWeight: 400 }}>
      By deleting the {title} <strong>"{rowToDelete}"</strong>, all the associated data will also be deleted.
    </Typography>
  );

  return (
    <>
      <Box sx={{ ...BoxStyles, ...containerSx }}>
        <DataGrid
          // rest props
          {...dataGridProps}
          // Table metadata
          sx={TableStyles}
          columns={!allowEditing ? columns.map((col) => ({ ...col, editable: false })) : columns}
          rows={rows}
          loading={loading}
          // Editing functionalities
          editMode={'row'}
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
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoResultsOverlay,
            exportIcon: SaveAlt
          }}
          localeText={{
            toolbarExportCSV: 'Download CSV'
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
      <ConfirmationModal
        open={deleteDialogOpen}
        title="Are you sure you want to delete?"
        message={DELETE_MESSAGE}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        variant="error"
        loading={isDeleting}
      />
    </>
  );
};

export default React.memo(AppTable);

function CustomNoRowsOverlay() {
  return (
    <Box sx={{ scale: 0.8, py: 1 }}>
      <Empty description="No data available." />
    </Box>
  );
}

function CustomNoResultsOverlay() {
  return (
    <Box sx={{ scale: 0.8, py: 1 }}>
      <Empty description="No results available." />
    </Box>
  );
}
