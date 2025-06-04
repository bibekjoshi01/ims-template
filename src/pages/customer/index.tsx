// PACKAGE IMPORTS

// PROJECT IMPORTS
import { validatePermissions } from '@/utils/permissions/validatePermissions';
import { customerPermissions } from './constants/permissions';

// LAZY COMPONENT IMPORTS

const Supplier = () => {
  return (
    <>
      <div> Hello this is customer moduel</div>
    </>
  );
};

export default validatePermissions(Supplier, customerPermissions);
