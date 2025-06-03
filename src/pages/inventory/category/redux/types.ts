import { IListResponse } from '@/globals';

export interface ICategorySliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export interface ICategoryItem {
  id: number;
  name?: string;
  code?: string;
  icon?: File | null;
  isActive?: boolean;
}

export interface ICategoryList extends IListResponse {
  results: ICategoryItem[];
}

export interface ICategoryCreatePayload {
  name?: string;
  code?: string;
  icon?: File | null;
  isActive?: boolean;
}

export interface ICategoryUpdatePayload {
  name?: string;
  code?: string;
  icon?: File | null;
  isActive?: boolean;
}

export interface ICategoryDetails {
  id: number;
  name?: string;
  code?: string;
  icon?: File | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
}
