import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
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
  createdAt?: string;
  permissions?: Permission[] | [];
  mainModules?: Permission | null;
  subModules?: Permission | null;
}

export interface UserRoleInputPost {
  name: string;
  permissions: number[];
  isActive: boolean;
}

export interface UserRoleInputPatch {
  name: string;
  permissions: number[];
  isActive: boolean;
  remarks: string;
}

export interface UserRoleListQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
}

export interface UserRoleList {
  count: number;
  results: UserRole[] | [];
}

export interface UserRoleMainModules {
  count: number;
  results: Permission[] | [];
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
