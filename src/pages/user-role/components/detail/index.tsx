// PACKAGE IMPORTS
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';

// LOCAL IMPORTS
import { useRetrieveUserRoleQuery } from '../../redux/user-role.api';
import { userRoleState } from '../../redux/user-role.selector';
import { clearViewId } from '../../redux/user-role.slice';
import DetailView from './DetailView';

const UserRoleDetailsModal = () => {
  const dispatch = useDispatch();
  const { viewId } = useSelector(userRoleState);

  const handleClose = () => {
    dispatch(clearViewId());
  };

  // Conditionally fetch user role details if ID is available
  const { data: userRoleData, isLoading } = useRetrieveUserRoleQuery(viewId!, {
    skip: !viewId
  });

  if (!viewId) return null;

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
