import { useEffect, useState, useCallback } from 'react';
import { GridRowId } from '@mui/x-data-grid';

// MUI IMPORTS
import AppTable from '@/components/app-table';
import { TableData, fetchInitialRows, getColumnConfig } from './tableData';

const ApiTables = () => {
  const [rows, setRows] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchInitialRows();
        setRows(data); // Set the rows directly
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = useCallback(async (updatedRow: TableData) => {
    // Simulate API update
    return new Promise<TableData>((resolve) => {
      setTimeout(() => {
        console.log('Updated row:', updatedRow);
        // Return the updated row to update the local state
        resolve(updatedRow);
      }, 1000);
    });
  }, []);

  const handleDelete = useCallback(async (id: GridRowId) => {
    // Simulate API delete
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Deleted row ID:', id);
        // Update the local state to remove the deleted row
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        resolve();
      }, 1000);
    });
  }, []);

  const handleRowUpdateError = useCallback((error: any) => {
    console.error('Row update failed:', error);
  }, []);

  return (
    <AppTable<TableData>
      title="Posts"
      initialRows={rows}
      onSaveRow={handleSave}
      onDeleteRow={handleDelete}
      getColumnConfig={getColumnConfig}
      handleRowUpdateError={handleRowUpdateError}
      loading={loading}
      allowEditing
      editMode="row"
      getRowId={(row) => row.id}
      pageSizeOptions={[5, 10, 20]}
      serverPagination={false}
    />
  );
};

export default ApiTables;
