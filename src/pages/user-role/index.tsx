// PACKAGE IMPORTS
import { lazy, useEffect } from 'react';

// PROJECT IMPORTS
import { useAppDispatch } from '@/libs/hooks';
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { setPermissions } from '../common/redux/common.slice';
import { userRolePermissions } from './constants/permissions';

const UserRoleListing = lazy(() => import('./components/UserRoleListing'));

const UserRole = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //set current model permission constants in redux
    dispatch(setPermissions(userRolePermissions));
    return () => {
      dispatch(setPermissions([]));
    };
  }, []);

  return (
    <div>
      <UserRoleListing />
    </div>
  );
};

export default validatePermissions(UserRole, userRolePermissions);
