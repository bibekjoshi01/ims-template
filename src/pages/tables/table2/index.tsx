import { useCallback } from 'react';

// MUI IMPORTS
import { GridRowId } from '@mui/x-data-grid';

// PROJECT IMPORTS
import AppTable from '@/components/app-table';
import { TableData, getColumnConfig, initialRows } from './tableData';

const Tables = () => {
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

  const handleRowUpdateError = useCallback((error: any) => {
    console.error('Row update error:', error);
  }, []);

  return (
    <AppTable<TableData>
      title="Product Data"
      initialRows={initialRows}
      onSaveRow={handleSave}
      onDeleteRow={handleDelete}
      getColumnConfig={getColumnConfig}
      handleRowUpdateError={handleRowUpdateError}
      allowEditing
      editMode="row"
      getRowId={(row) => row.id}
      enableRowSelection
    />
  );
};

export default Tables;
