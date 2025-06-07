import { IListResponse } from '@/globals';

export interface ICustomerSliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NA = 'NA'
}

export enum AddressLabelEnum {
  DEFAULT = 'DEFAULT',
  HOME = 'HOME',
  OFFICE = 'OFFICE'
}

export interface ICustomerItem {
  id: number;
  fullName: string;
  customerNo: string;
  email: string;
  gender?: GenderEnum;
  phoneNo: string;
  altPhoneNo: string;
  isPerson: boolean;
  isActive: boolean;
  photo: string | null;
}

export interface ICustomerAddressItem {
  id?: number;
  label: AddressLabelEnum;
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
  gender?: GenderEnum;
  notes?: string;
  isActive: boolean;
  photo?: File | null | undefined;
  addresses?: ICustomerAddressItem[] | [];
}

export interface ICustomerUpdatePayload {
  fullName?: string;
  email?: string;
  phoneNo?: string;
  altPhoneNo?: string;
  isPerson?: boolean;
  gender?: GenderEnum;
  isActive?: boolean;
  notes?: string;
  photo?: File | null | undefined;
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
