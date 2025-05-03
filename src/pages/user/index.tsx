// PACKAGE IMPORTS
import { lazy, useEffect } from 'react';

// PROJECT IMPORTS
import { useAppDispatch } from '@/libs/hooks';
import { validatePermissions } from '@/utils/permissions/validate_permissions';
import { setPermissions } from '../common/redux/common.slice';
import { userPermission } from './constants/permissions';

const UserListing = lazy(() => import('./UserListing'));

const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //set current model permission constants in redux
    dispatch(setPermissions(userPermission));
    return () => {
      dispatch(setPermissions([]));
    };
  }, []);

  return (
    <div>
      <UserListing />
    </div>
  );
};

export default validatePermissions(User, userPermission);
