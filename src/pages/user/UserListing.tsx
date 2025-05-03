// PROJECT IMPORTS
import AppTable from '@/components/app-table';
import { getColumnConfig, initialRows } from '../tables/table1/tableData';

const UserListing = () => {
  return (
    <AppTable title="Users" initialRows={initialRows} getColumnConfig={getColumnConfig} allowEditing editMode="row" enableRowSelection />
  );
};

export default UserListing;
