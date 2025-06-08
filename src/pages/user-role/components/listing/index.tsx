// REACT IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';

import { useHasParticularPermissions } from '@/utils/permissions/helpers';
import { userRolePermissions } from '../../constants/permissions';
import { useUserRoleTable } from '../../hooks/useUserRoleTable';
import { TableData, getColumnConfig } from './config';

// LAZY LOADED COMPONENTS
const UserRoleCreateForm = lazy(() => import('../create-form'));

const UserRoleListingSection = () => {
  const tableHooks = useUserRoleTable();
  const canCreate = useHasParticularPermissions(userRolePermissions.add);
  const canEdit = useHasParticularPermissions(userRolePermissions.edit);
  const canDelete = useHasParticularPermissions(userRolePermissions.delete);

  return (
    <TableContainer<TableData>
      title="User Roles"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <UserRoleCreateForm onClose={onClose} /> : undefined}
      allowEditing={canEdit}
      allowDeleting={canDelete}
    />
  );
};

export default UserRoleListingSection;
