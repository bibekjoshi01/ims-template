// REACT IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';

// LOCAL IMPORTS
import { useHasParticularPermissions } from '@/utils/permissions/helpers';
import { productPermissions } from '../../../constants/permissions';
import { useCategoryTable } from '../../hooks/useProductTable';
import { ITableData, getColumnConfig } from './config';

// LAZY LOADED COMPONENTS
const ProductCreateForm = lazy(() => import('../create-form'));

const ProductListingSection = () => {
  const tableHooks = useCategoryTable();
  const canCreate = useHasParticularPermissions(productPermissions.add);
  const canEdit = useHasParticularPermissions(productPermissions.edit);
  const canDelete = useHasParticularPermissions(productPermissions.delete);

  return (
    <TableContainer<ITableData>
      title="Products"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <ProductCreateForm onClose={onClose} /> : undefined}
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

export default ProductListingSection;
