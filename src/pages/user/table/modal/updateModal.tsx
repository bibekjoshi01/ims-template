import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';

// Components
import AppDialog from '@/components/app-dialog';
import { clearUserData, setEdit } from '../../redux/user.slice';
import { userState } from '../../redux/user.selector';
import { useRetrieveUserQuery } from '../../redux/user.api';
import UserUpdateForm from '../updateForm';

// RTK Query

const UserEditModal = () => {
  const dispatch = useDispatch();
  const { edit, currentId } = useSelector(userState);

  // Only fetch when we have a valid ID and are in edit mode
  const { data: userData, isLoading } = useRetrieveUserQuery(currentId, { skip: !currentId || !edit });

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
      title="Edit User"
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
