import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AppDialog from '@/components/app-dialog';
import { useRetrieveUserQuery } from '../../redux/user.api';
import { userState } from '../../redux/user.selector';
import { clearUserData, setEdit } from '../../redux/user.slice';
import UserUpdateForm from './Form';

const UserEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(userState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: userData, isLoading } = useRetrieveUserQuery(currentId, { skip: !currentId || !edit });

  // If the either of value is not set, we don't need to show the modal
  if (!currentId || !edit) {
    return null;
  }

  const handleClose = () => {
    dispatch(setEdit(false));
    dispatch(clearUserData());
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
          <UserUpdateForm userData={userData} onClose={handleClose} />
        )
      }
    />
  );
};

export default UserEditModal;
