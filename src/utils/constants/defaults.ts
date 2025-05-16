export const defaultPaginationDetail = {
  page: 0,
  pageSize: 10
};

export type BackendError = {
  status: number;
  data: Record<string, string>;
};

export const resetPasswordTokenLength = 32;
