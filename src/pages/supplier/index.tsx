// PACKAGE IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { supplierPermissions } from './constants/permissions';

// LAZY COMPONENT IMPORTS
const SupplierListing = lazy(() => import('./components/listing'));
const SupplierEditModal = lazy(() => import('./components/update-form'));

const Supplier = () => {
  return (
    <>
      <SupplierListing />
      <SupplierEditModal />
    </>
  );
};

export default validatePermissions(Supplier, supplierPermissions);
