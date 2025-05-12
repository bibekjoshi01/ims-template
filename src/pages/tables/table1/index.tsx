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
    <AppTable
      title="User Data"
      initialRows={initialRows}
      onSaveRow={handleSave}
      onDeleteRow={handleDelete}
      getColumnConfig={getColumnConfig}
      handleRowUpdateError={handleRowUpdateError}
      getRowId={(row) => row.id}
      allowEditing
      enableRowSelection
      editMode="row"
      paginationMode="client"
      sortingMode="client"
      filterMode="client"

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
