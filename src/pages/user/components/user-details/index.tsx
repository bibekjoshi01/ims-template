import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AppDialog from '@/components/app-dialog';
import { useRetrieveUserQuery } from '../../redux/user.api';
import { userState } from '../../redux/user.selector';
import { clearViewId } from '../../redux/user.slice';
import UserDetails from './UserDetails';

const UserDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(userState);

  // Only fetch when we have a valid ID of user
  const { data: userData, isLoading } = useRetrieveUserQuery(viewId, { skip: !viewId });

  if (!viewId) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearViewId());
  };

  // If the viewId is not set, we don't need to show the modal

  return (
    <AppDialog
      open={!!viewId}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      content={
        isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <UserDetails userData={userData} onClose={handleClose} />
        )
      }
    />
  );
};

export default UserDetailsModal;
