// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { productPermissions } from '../constants/permissions';

const Product = () => {
  return (
    <>
      <div>This is products page</div>
    </>
  );
};

export default validatePermissions(Product, productPermissions);
