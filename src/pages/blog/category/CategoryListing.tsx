// PROJECT IMPORTS
import AppTable from '@/components/app-table';
import Typography from '@mui/material/Typography';
import { getColumnConfig, rowValues } from './tableData';

const Tables = () => {
  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: '20px' }}>
        Categories
      </Typography>
      <AppTable
        initialRows={rowValues}
        getColumnConfig={getColumnConfig}
        allowEditing
        editMode="row"
        getRowId={(row) => row.id}
        enableRowSelection
      />
    </>
  );
};

export default Tables;
