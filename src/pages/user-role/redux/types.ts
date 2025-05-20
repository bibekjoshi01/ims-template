import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export interface Permission {
  id?: number;
  name: string;
  codename: string;
  isActive: boolean;
}

export interface UserPermissionItem extends Permission {
  mainModule: number;
  mainModuleName: string;
  permissionCategory: number;
  permissionCategoryName: string;
}

export interface UserRole extends Permission {
  createdAt?: string;
}

export interface MainModule extends Permission {}
export interface SubModule extends Omit<MainModule, 'codename'> {
  mainModule: number;
  mainModuleName: string;
}

interface detaiPermission extends Omit<MainModule, 'isActive'> {
  id: number;
  permissionCategory: number;
}

export interface UserRoleDetailed extends Permission {
  id: number;
  permissions: detaiPermission[];
  createdBy: number;
  createdByUsername: string;
  createdByFullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRole {
  name: string;
  permissions?: number[];
  isActive?: boolean;
}

export interface UpdateUserRole {
  id: number;
  values: {
    name?: string;
    permissions?: number[];
    isActive?: boolean;
    remarks?: string;
  };
}

export interface Response<T> {
  count: number;
  results: T[] | [];
}

export interface UserRoleList extends Response<UserRole> {}
export interface UserRoleMainModules extends Response<MainModule> {}
export interface UserRoleSubModules extends Response<SubModule> {}
export interface UserPermissionCategory extends Response<UserPermissionItem> {}

export interface PermissionsProps {
  allUserPermissions: UserPermissionItem[];
  mainModule: Permission | null;
  loading: boolean;
  setValue: UseFormSetValue<any>;
  selectedPermissions: UserPermissionItem[];
  setSelectedPermissions: Dispatch<SetStateAction<UserPermissionItem[]>>;
}

export interface UserRoleSliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export interface UserRoleListQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
}
