import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';
import { useUserRoleTable } from '../../hooks/useUserRoleTable';
import { TableData, getColumnConfig } from './config';

const UserRoleCreateForm = lazy(() => import('../create'));

const UserRoleListing = () => {
  const tableHooks = useUserRoleTable();

  return (
    <TableContainer<TableData>
      title="User Roles"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createNewForm={(onClose) => <UserRoleCreateForm onClose={onClose} />}
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

export default UserRoleListing;
