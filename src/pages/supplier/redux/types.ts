import { IListResponse } from '@/globals';

export interface ISupplierSliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export interface ISupplierItem {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phoneNo: string;
  altPhoneNo: string;
  address: string;
  country: string;
  website: string;
  taxId: string;
  isActive: boolean;
}

export interface ISupplierList extends IListResponse {
  results: ISupplierItem[];
}

export interface ISupplierCreatePayload {
  name: string;
  contactPerson: string;
  email: string;
  phoneNo: string;
  altPhoneNo?: string;
  address: string;
  country: string;
  website?: string;
  taxId?: string;
  isActive: boolean;
  notes: string;
}

export interface ISupplierUpdatePayload {
  name?: string;
  contactPerson?: string;
  email?: string;
  phoneNo?: string;
  altPhoneNo?: string;
  address?: string;
  country?: string;
  website?: string;
  taxId?: string;
  isActive?: boolean;
}

export interface ISupplierDetails {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phoneNo: string;
  altPhoneNo: string;
  address: string;
  country: string;
  website: string;
  taxId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
}
