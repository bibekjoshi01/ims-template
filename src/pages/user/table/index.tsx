import TableContainer from '@/components/app-table/TableContainer';
import { useUserTable } from '../hooks/useUserTable';
import { TableData, getColumnConfig } from './tableData';
import UserForm from './createForm';
import UserEditModal from './modal/updateModal';

const UserListing = () => {
  const tableHooks = useUserTable();

  return (
    <>
      <TableContainer<TableData>
        title="Users"
        useTableHook={tableHooks}
        getColumnConfig={getColumnConfig}
        createNewForm={(onClose) => <UserForm onClose={onClose} />}
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
