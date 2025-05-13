import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AppDialog from '@/components/app-dialog';
import { useRetrieveUserRoleQuery } from '../../redux/user-role.api';
import { userRoleState } from '../../redux/user-role.selector';
import { clearUserRoleData, setEdit } from '../../redux/user-role.slice';
import UserRoleUpdateForm from './Form';

const UserEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(userRoleState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: userRoleData, isLoading } = useRetrieveUserRoleQuery(currentId, { skip: !currentId || !edit });

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

export default UserEditModal;
