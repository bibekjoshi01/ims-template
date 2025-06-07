import { lazy, useMemo, useRef } from 'react';
import TableContainer from '@/components/app-table/TableContainer';
import { useHasParticularPermissions } from '@/utils/permissions/helpers';
import { userPermissions } from '../../constants/permissions';
import { useUserTable } from '../../hooks/useUserTable';
import { TableData, getColumnConfig } from './config';

const UserCreateForm = lazy(() => import('../create-form'));

const UserListingSection = () => {
  const tableHooks = useUserTable();

  const canCreate = useHasParticularPermissions(userPermissions.add);
  const canEdit = useHasParticularPermissions(userPermissions.edit);
  const canDelete = useHasParticularPermissions(userPermissions.delete);

  return (
    <TableContainer<TableData>
      title="Users"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <UserCreateForm onClose={onClose} /> : undefined}
      allowEditing={canEdit}
      allowDeleting={canDelete}
    />
  );
};

export default UserListingSection;
