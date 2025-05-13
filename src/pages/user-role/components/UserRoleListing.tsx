import { lazy } from 'react';

import { useUserRoleTable } from '../hooks/useUserRoleTable';
import TableContainer from '@/components/app-table/TableContainer';
import { TableData, getColumnConfig } from './userRoleListingTable.config';

const UserRoleEditModal = lazy(() => import('./update-form'));
const UserRoleCreateForm = lazy(() => import('./create-form'));

const UserRoleListing = () => {
  const tableHooks = useUserRoleTable();

  return (
    <>
      <TableContainer<TableData>
        title="User Roles"
        useTableHook={tableHooks}
        getColumnConfig={getColumnConfig}
        createNewForm={(onClose) => <UserRoleCreateForm onClose={onClose} />}
        createButtonTitle="Create User Role"
        allowEditing
        showFilter
        showSearch
        showExport
        showDensitySelector
        enableRowSelection
      />
      <UserRoleEditModal />
    </>
  );
};

export default UserRoleListing;
