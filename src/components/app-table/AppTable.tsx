// MUI IMPORTS
import SaveAlt from '@mui/icons-material/SaveAlt';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridRowEditStopParams, GridRowEditStopReasons, GridRowParams, MuiEvent } from '@mui/x-data-grid';

// Project Imports
import { Empty } from 'antd';
import Toolbar from './toolbar';
import { BoxStyles, TableStyles } from './styles';
import { AppTableProps } from './types';
import { createColumnDefs } from './columns';
import { useTableHandlers } from '@/hooks/useTableHandlers';
import ConfirmationModal from '../app-dialog/ConfirmationDialog';
import { useCallback, useMemo, useState } from 'react';
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
  showSearch = true,
  showFilter = true,
  showExport = true,
  showColumnFilter = true,
  showDensitySelector = true,
  showCellVerticalBorder = false,

  // Table functionalities
  allowSorting = true,
  allowEditing = false,
  allowDeleting = true,
  editMode = 'row',
  enableColumnResizing = false,
  enableRowSelection = true,

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

  // Exporting
  exportFileName,

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

  const ToolbarComponent = useCallback(
    (props: any) => (
      <Toolbar
        {...props}
        title={title}
        showSearch={showSearch}
        showColumnFilter={showColumnFilter}
        showFilter={showFilter}
        showDensitySelector={showDensitySelector}
        showExport={showExport}
        exportFileName={exportFileName}
        createNewForm={createNewForm}
        createButtonTitle={createButtonTitle}
      />
    ),
    [title, showSearch, showColumnFilter, showFilter, showDensitySelector, showExport, exportFileName, createNewForm, createButtonTitle]
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

  // defines which fields are hidden or visible by default
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(() => {
    const initialModel: Record<string, boolean> = {};
    columnConfig.forEach((col) => {
      if ('visible' in col) {
        initialModel[col.field as string] = col.visible !== false;
      }
    });
    return initialModel;
  });

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
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
          showCellVerticalBorder={showCellVerticalBorder}
          checkboxSelection={enableRowSelection}
          // Pagination Sorting and filtering
          // Mode
          paginationMode={paginationMode}
          sortingMode={sortingMode}
          filterMode={filterMode}
          disableColumnMenu
          // Models
          paginationModel={paginationMode === 'server' ? paginationModel : undefined}
          filterModel={
            filterMode === 'server'
              ? {
                  items: filterModel.items,
                  quickFilterValues: filterModel?.quickFilterValues ?? []
                }
              : undefined
          }
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
            toolbar: ToolbarComponent,
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
              ...dataGridProps.initialState?.filter
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

export default AppTable;

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
