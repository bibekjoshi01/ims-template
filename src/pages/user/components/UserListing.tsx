import { lazy } from 'react';

import TableContainer from '@/components/app-table/TableContainer';
import { useUserTable } from '../hooks/useUserTable';
import { TableData, getColumnConfig } from './userListingTable.config';

const UserEditModal = lazy(() => import('./update-form'));
const UserCreateForm = lazy(() => import('./create-form'));

const UserListing = () => {
  const tableHooks = useUserTable();

  return (
    <>
      <TableContainer<TableData>
        title="Users"
        useTableHook={tableHooks}
        getColumnConfig={getColumnConfig}
        createNewForm={(onClose) => <UserCreateForm onClose={onClose} />}
        createButtonTitle="Create User"
        allowEditing
        showFilter
        showSearch
        showExport
        showDensitySelector
        enableRowSelection
      />
      <UserEditModal />
    </>
  );
};

export default UserListing;
