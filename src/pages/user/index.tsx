// PACKAGE IMPORTS
import React, { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { userPermissions } from './constants/permissions';

const UserListing = lazy(() => import('./components/UserListing'));
const UserDetailsModal = lazy(() => import('./components/user-details'));
const UserEditModal = lazy(() => import('./components/update-form'));

const User = () => {
  return (
    <React.Fragment>
      <UserListing />
      <UserEditModal />
      <UserDetailsModal />
    </React.Fragment>
  );
};

export default validatePermissions(User, userPermissions);
