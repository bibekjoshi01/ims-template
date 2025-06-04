import { lazy } from 'react';

import TableContainer from '@/components/app-table/TableContainer';

import { useHasParticularPermissions } from '@/utils/permissions/helpers';
import { supplierPermissions } from '../../constants/permissions';
import { useSupplierTable } from '../../hooks/useSupplierTable';
import { ITableData, getColumnConfig } from './config';

const SupplierCreateForm = lazy(() => import('../create-form'));

const SupplierListingSection = () => {
  const tableHooks = useSupplierTable();
  const canCreate = useHasParticularPermissions(supplierPermissions.add);
  const canEdit = useHasParticularPermissions(supplierPermissions.edit);
  const canDelete = useHasParticularPermissions(supplierPermissions.delete);

  return (
    <TableContainer<ITableData>
      title="Suppliers"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <SupplierCreateForm onClose={onClose} /> : undefined}
      allowEditing={canEdit}
      allowDeleting={canDelete}
      showFilter
      showSearch
      showExport
      showDensitySelector
      enableRowSelection
    />
  );
};

export default SupplierListingSection;
