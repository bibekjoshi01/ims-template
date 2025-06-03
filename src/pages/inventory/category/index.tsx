// PACKAGE IMPORTS
import { lazy } from 'react';

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { categoryPermissions } from '../constants/permissions';

// LAZY COMPONENT IMPORTS
const CategoryListing = lazy(() => import('./components/listing'));
const CategoryEditModal = lazy(() => import('./components/update-form'));
const CategoryDetailModal = lazy(() => import('./components/detail'));

const ProductCategory = () => {
  return (
    <>
      <CategoryListing />
      <CategoryEditModal />
      <CategoryDetailModal />
    </>
  );
};

export default validatePermissions(ProductCategory, categoryPermissions);
