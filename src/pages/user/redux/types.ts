import { PaginationParams } from '@/pages/common/redux/types';
import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

export interface UserRole {
  id: number;
  name: string;
  codename: string;
  isActive?: boolean;
}

export interface UseRoleList {
  count: number;
  results: UserRole[];
}

export interface UserItem {
  id: number;
  username: string;
  firstName: string;
  middleName: string;
  email: string;
  phoneNo: string;
  photo: string;
  lastName: string;
  isActive: boolean;
  dateJoined: string;
  updatedAt: string;
}

export interface UserList {
  count: number;
  results: UserItem[];
}

export interface UserInput {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  roles: number[];
  phoneNo?: string;
  isActive?: boolean;
  photo?: File | null | undefined;
}

export interface UserUpdateInput {
  firstName?: string;
  lastName?: string;
  roles?: number[];
  phoneNo?: string;
  isActive?: boolean;
  photo?: File | null | undefined;
}

export interface UserDetails extends UserItem {
  roles: { id: number; name: string }[];
  userPermissions: UserRole[] | [];
}

export interface UserSliceState {
  edit: boolean;
  currentId: number | null;
}

export interface UserListQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
}

export interface UserRolesListQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
}
