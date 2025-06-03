import { IListResponse } from '@/globals';

export interface IProductSliceState {
  edit: boolean;
  currentId: number | null;
  viewId: number | null;
}

export interface IProductCategoryItem {
  id: number;
  name: string;
  code: string;
  icon: string;
}

export interface IProductUnitItem {
  id: number;
  name: string;
  shortForm: string;
}

export interface IProductItem {
  id: number;
  name: string;
  sku: string;
  image: string;
  category: number | string;
  unit: number | string;
  sellingPrice: number;
  stockAlertQty: number;
  isActive: boolean;
}

export interface IProductList extends IListResponse {
  results: IProductItem[];
}

export interface IProductDetails {
  id: number;
  name: string;
  sku: string;
  image: string;
  category: IProductCategoryItem;
  unit: IProductUnitItem;
  sellingPrice: number;
  stockAlertQty: number;
  barcode: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
}

export interface IProductCreatePayload {
  name: string;
  sku?: string;
  image?: File | null;
  category: number;
  unit: number;
  sellingPrice: number;
  stockAlertQty?: number;
  barcode?: string;
  description?: string;
}

export interface IProductUpdatePayload {
  name?: string;
  sku?: string;
  image?: File | string | null;
  category?: number;
  unit?: number;
  sellingPrice?: number;
  stockAlertQty?: number;
  barcode?: string;
  description?: string;
}

export interface IProductCategoryListResponse extends IListResponse {
  results: IProductCategoryItem[];
}

export interface IProductUnitListResponse extends IListResponse {
  results: IProductUnitItem[];
}
