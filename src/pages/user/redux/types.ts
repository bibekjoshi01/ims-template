import { PaginationParams } from '@/pages/common/redux/types';

export interface UserRole {
  id: number;
  name: string;
  codename: string;
  isActive: boolean;
}

export interface UserItem {
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
  username: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string | File | null;
  phoneNo: string;
  roles: UserRole[] | [];
  isActive: boolean;
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
  paginationDetail?: PaginationParams;
}
