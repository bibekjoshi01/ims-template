import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Components
import AppDialog from '@/components/app-dialog';
import { useRetrieveUserRoleQuery } from '../../redux/user-role.api';
import { userRoleState } from '../../redux/user-role.selector';
import { clearViewId } from '../../redux/user-role.slice';
import DetailView from './DetailView';

const UserRoleDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(userRoleState);

  // Only fetch when we have a valid ID of user-role
  const { data: userRoleData, isLoading } = useRetrieveUserRoleQuery(viewId!, { skip: !viewId });

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
          <DetailView userRoleData={userRoleData} onClose={handleClose} />
        )
      }
    />
  );
};

export default UserRoleDetailsModal;
