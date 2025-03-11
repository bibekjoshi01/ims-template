import { useCallback, useMemo } from 'react';

// MUI IMPORTS
import { useTheme } from '@mui/material/styles';
import { GridRowId } from '@mui/x-data-grid';

// PROJECT IMPORTS
import AppTable from '@/components/app-table';
import { createColumnDefs } from '@/components/app-table/columns';
import { TableData, getColumnConfig, initialRows } from './tableData';

// HOOKS
import { useTableHandlers } from '@/hooks/useTableHandlers';

// ==============================
// MAIN TABLE COMPONENT
// ==============================
const Tables = () => {
  const theme = useTheme();

  // Handles saving an updated row
  const handleSave = useCallback(async (updatedRow: TableData) => {
    try {
      // Simulating save operation and return promise
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          console.log('Row saved:', updatedRow);
          resolve();
          // reject('Save failed!');
        }, 2000);
      });
    } catch (error) {
      console.error(`Error saving rowId(${updatedRow.id})`, error);
    }
  }, []);

  // Handles deleting a row
  const handleDelete = useCallback(async (id: GridRowId) => {
    try {
      // Simulating delete operation and return promise
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          console.log('Row deleted:', id);
          resolve();
          // reject("Delete failed!");
        }, 2000);
      });
    } catch (error) {
      console.error(`Error deleting rowId(${id})`, error);
    }
  }, []);

  // For handling row update errors
  const handleRowUpdateError = useCallback((error: any) => {
    console.error('Row update error:', error);
  }, []);

  // Prepares above handlers to be used in the table and also get other handlers and states
  const {
    rows, // Table data rows
    rowModesModel, // Tracks edit mode per row
    setRowModesModel, // Updates rowModesModel
    savingRows, // Tracks saving state of rows
    handlers // Row action handlers (edit, delete, save, cancel, copy, processRowUpdate)
  } = useTableHandlers<TableData>(initialRows, handleSave, handleDelete);

  // This gets column configurations
  const columnConfig = useMemo(() => getColumnConfig(theme), [theme]);

  // This generates columns to be used in table using above column configurations
  const columns = useMemo(
    () => createColumnDefs<TableData>(columnConfig, theme, handlers, rowModesModel, savingRows),
    [columnConfig, theme, handlers, rowModesModel]
  );

  // ==============================
  // RENDER TABLE COMPONENT
  // ==============================
  return (
    <AppTable
      title="User Data"
      columns={columns} // Column definitions
      rows={rows} // Table data
      rowModesModel={rowModesModel} // Tracks edit mode of row
      onRowModesModelChange={setRowModesModel} // Handles row mode changes
      processRowUpdate={handlers.processRowUpdate} // Handles row updates
      handleRowUpdateError={handleRowUpdateError} // Handles row update errors
      // Table features
      allowEditing // Enables inline row editing
      editMode="row" // Enables row-level editing
      getRowId={(row) => row.id} // Defines unique row ID
      enableRowSelection // Enables row selection via checkboxes

      // if you want to disable pass false to the following props
      // check all other props too
      // showCellVerticalBorder // Enables vertical cell borders
      // showSearch // Enables search input
      // showColumnFilter // Enables column filter panel
      // showFilter  // Enables filter panel
      // showDensitySelector // Enables density selector
      // showExport // Enables export button
    />
  );
};

export default Tables;
