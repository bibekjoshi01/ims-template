// PACKAGE IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { userPermissions } from './constants/permissions';

// LAZY COMPONENT IMPORTS
const UserListing = lazy(() => import('./components/listing'));
const UserDetailsModal = lazy(() => import('./components/detail'));
const UserEditModal = lazy(() => import('./components/update-form'));

const User = () => {
  return (
    <>
      <UserListing />
      <UserEditModal />
      <UserDetailsModal />
    </>
  );
};

export default validatePermissions(User, userPermissions);
