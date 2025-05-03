import { PaginationParams } from '@/pages/common/redux/types';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export interface Permission {
  id?: number;
  name: string;
  codename: string;
  isActive: boolean;
}

export interface UserRole {
  id?: number;
  name: string;
  codename: string;
  isActive: boolean;
  permissions?: Permission[] | [];
  mainModules?: Permission | null;
  subModules?: Permission | null;
}

export interface UserRoleListQueryParams {
  search: string;
  paginationDetail?: PaginationParams;
}

export interface UserRoleList {
  count: number;
  results: UserRole[] | [];
}

export interface UserPermissionItem {
  id: number;
  name: string;
  codename: string;
  isActive: boolean;
  mainModule: number;
  mainModuleName: string;
  permissionCategory: number;
  permissionCategoryName: string;
}

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
  currentId: null | number;
}
