// REACT IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import TableContainer from '@/components/app-table/TableContainer';

// LOCAL IMPORTS
import { useHasParticularPermissions } from '@/utils/permissions/helpers';
import { categoryPermissions } from '../../../constants/permissions';
import { useCategoryTable } from '../../hooks/useCategoryTable';
import { ITableData, getColumnConfig } from './config';

// LAZY LOADED COMPONENTS
const CategoryCreateForm = lazy(() => import('../create-form'));

const CategoryListingSection = () => {
  const tableHooks = useCategoryTable();
  const canCreate = useHasParticularPermissions(categoryPermissions.add);
  const canEdit = useHasParticularPermissions(categoryPermissions.edit);
  const canDelete = useHasParticularPermissions(categoryPermissions.delete);

  return (
    <TableContainer<ITableData>
      title="Categories"
      useTableHook={tableHooks}
      getColumnConfig={getColumnConfig}
      createButtonTitle="Add"
      createNewForm={canCreate ? (onClose) => <CategoryCreateForm onClose={onClose} /> : undefined}
      allowEditing={canEdit}
      allowDeleting={canDelete}
    />
  );
};

export default CategoryListingSection;
