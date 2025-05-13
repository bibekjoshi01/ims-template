import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';
import { useUserRoleTable } from '../hooks/useUserRoleTable';
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
        createButtonTitle="Add User Role"
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
