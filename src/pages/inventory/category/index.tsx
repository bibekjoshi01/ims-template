// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { categoryPermissions } from '../constants/permissions';

const ProductCategory = () => {
  return (
    <>
      <div>This is products category page</div>
    </>
  );
};

export default validatePermissions(ProductCategory, categoryPermissions);
