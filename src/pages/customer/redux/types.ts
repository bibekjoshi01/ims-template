import { IListResponse } from '@/globals';

export interface ICustomerSliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export interface ICustomerItem {
  id: number;
  fullName: string;
  customerNo: string;
  email: string;
  phoneNo: string;
  altPhoneNo: string;
  isPerson: boolean;
  isActive: boolean;
  photo: string | null;
}

export interface ICustomerAddressItem {
  id: number;
  label: string;
  address: string;
}

export interface ICustomerList extends IListResponse {
  results: ICustomerItem[];
}

export interface ICustomerCreatePayload {
  fullName: string;
  email?: string;
  phoneNo: string;
  altPhoneNo?: string;
  isPerson: boolean;
  notes?: string;
  isActive: boolean;
  photo?: File | null;
  addresses?: ICustomerAddressItem[] | [];
}

export interface ICustomerUpdatePayload {
  fullName?: string;
  email?: string;
  phoneNo?: string;
  altPhoneNo?: string;
  isPerson?: boolean;
  isActive?: boolean;
  notes?: string;
  photo?: File | null;
  addresses?: ICustomerAddressItem[] | [];
}

export interface ICustomerDetails {
  id: number;
  fullName: string;
  customerNo: string;
  email: string;
  phoneNo: string;
  altPhoneNo: string;
  isPerson: boolean;
  photo: string | null;
  notes: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
  addresses: ICustomerAddressItem[];
}
