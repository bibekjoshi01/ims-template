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
