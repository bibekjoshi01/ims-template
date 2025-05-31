import { lazy } from 'react';

import TableContainer from '@/components/app-table/TableContainer';
import { useUserTable } from '../hooks/useUserTable';
import { TableData, getColumnConfig } from './userListingTable.config';

const UserCreateForm = lazy(() => import('./create-form'));

const UserListing = () => {
  const tableHooks = useUserTable();

  return (
    <TableContainer<TableData>
      title="Users"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createNewForm={(onClose) => <UserCreateForm onClose={onClose} />}
      createButtonTitle="Add"
      allowEditing
      showFilter
      showSearch
      showExport
      showDensitySelector
      enableRowSelection
    />
  );
};

export default UserListing;
