import { IRequiredPermission } from '@/globals';

export const categoryPermissions: IRequiredPermission = {
  view: 'view_category',
  edit: 'edit_category',
  add: 'add_category',
  delete: 'delete_category'
};

export const productPermissions: IRequiredPermission = {
  view: 'view_product',
  edit: 'edit_product',
  add: 'add_product',
  delete: 'delete_product'
};
