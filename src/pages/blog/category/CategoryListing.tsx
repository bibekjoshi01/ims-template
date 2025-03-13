// PROJECT IMPORTS
import AppTable from '@/components/app-table';
import { getColumnConfig, rowValues } from './tableData';

const Tables = () => {
  return (
    <AppTable
      title="Categories"
      initialRows={rowValues}
      getColumnConfig={getColumnConfig}
      allowEditing
      editMode="row"
      getRowId={(row) => row.id}
      enableRowSelection
    />
  );
};

export default Tables;
