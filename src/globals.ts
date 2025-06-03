import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

export type BackendError = {
  status: number;
  data: Record<string, string>;
};

export interface IRequiredPermission {
  view: string;
  edit: string;
  add: string;
  delete: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface IListResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IListQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
}

export interface IMutationSuccessResponse {
  id?: number;
  message?: string;
  is_internal?: boolean;
}
