// PACKAGE IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { customerPermissions } from './constants/permissions';

// LAZY COMPONENT IMPORTS
const CustomerListing = lazy(() => import('./components/listing'));
const CustomerEditModal = lazy(() => import('./components/update-form'));
const CustomerDetailsModal = lazy(() => import('./components/detail'));

const Customer = () => {
  return (
    <>
      <CustomerListing />
      <CustomerEditModal />
      <CustomerDetailsModal />
    </>
  );
};

export default validatePermissions(Customer, customerPermissions);
