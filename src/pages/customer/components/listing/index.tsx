// REACT IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';

// LOCAL IMPORTS
import { ITableData, getColumnConfig } from './config';
import { useCustomerTable } from '../../hooks/useCustomerTable';
import { customerPermissions } from '../../constants/permissions';
import { useHasParticularPermissions } from '@/utils/permissions/helpers';

// LAZY LOADED COMPONENTS
const CustomerCreateForm = lazy(() => import('../create-form'));

const CustomerListingSection = () => {
  const tableHooks = useCustomerTable();
  const canCreate = useHasParticularPermissions(customerPermissions.add);
  const canEdit = useHasParticularPermissions(customerPermissions.edit);
  const canDelete = useHasParticularPermissions(customerPermissions.delete);

  return (
    <TableContainer<ITableData>
      title="Customers"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <CustomerCreateForm onClose={onClose} /> : undefined}
      allowEditing={canEdit}
      allowDeleting={canDelete}
    />
  );
};

export default CustomerListingSection;
