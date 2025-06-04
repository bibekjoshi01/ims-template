// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { productPermissions } from '../constants/permissions';
import { lazy } from 'react';

// LAZY COMPONENT IMPORTS
const ProductListing = lazy(() => import('./components/listing'));
const ProductEditModal = lazy(() => import('./components/update-form'));
const ProductDetailModal = lazy(() => import('./components/detail'));

const Product = () => {
  return (
    <>
      <ProductListing />
      <ProductEditModal />
      <ProductDetailModal />
    </>
  );
};

export default validatePermissions(Product, productPermissions);
