// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveUserRoleQuery } from '../../redux/user-role.api';
import { userRoleState } from '../../redux/user-role.selector';
import { clearUserRoleData, setEdit } from '../../redux/user-role.slice';
import UserRoleUpdateForm from './Form';

const UserRoleUpdateModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(userRoleState);

  const { data: userRoleData, isLoading } = useRetrieveUserRoleQuery(currentId as number, {
    skip: !currentId || !edit
  });

  if (!currentId || !edit) {
    return null;
  }

  const handleClose = () => {
    dispatch(setEdit(false));
    dispatch(clearUserRoleData());
  };

  return (
    <AppDialog
      open={edit}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      content={
        isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <UserRoleUpdateForm userRoleData={userRoleData} onClose={handleClose} />
        )
      }
    />
  );
};

export default UserRoleUpdateModal;
