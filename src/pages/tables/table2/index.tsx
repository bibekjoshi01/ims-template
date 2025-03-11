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

  // Prepares above handlers to be used in the table
  const { rows, rowModesModel, setRowModesModel, savingRows, handlers } = useTableHandlers<TableData>(
    initialRows,
    handleSave,
    handleDelete
  );

  // This defines column configurations
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
      // These must be provided
      title="Product Data"
      columns={columns}
      rows={rows}
      rowModesModel={rowModesModel}
      onRowModesModelChange={setRowModesModel}
      processRowUpdate={handlers.processRowUpdate}
      handleRowUpdateError={handleRowUpdateError}
      // Table features (optional)
      allowEditing
      editMode="row"
      getRowId={(row) => row.id}
      enableRowSelection
    />
  );
};

export default Tables;
