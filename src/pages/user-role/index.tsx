// PACKAGE IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { userRolePermissions } from './constants/permissions';

// LAZY COMPONENT IMPORTS
const UserRoleListingSection = lazy(() => import('./components/listing'));
const UserRoleEditModal = lazy(() => import('./components/update'));
const UserRoleDetailModal = lazy(() => import('./components/detail'));

const UserRolePage = () => {
  return (
    <>
      <UserRoleListingSection />
      <UserRoleEditModal />
      <UserRoleDetailModal />
    </>
  );
};

export default validatePermissions(UserRolePage, userRolePermissions);
