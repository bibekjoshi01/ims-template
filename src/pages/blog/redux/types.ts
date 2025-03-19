export interface BlogCategoryItem {
  id: number;
  name: string;
  slug: string;
  parent?: BlogCategoryItem | null;
  description: string;
  postCount?: number;
}

export interface BlogCategoryResponse {
  count: number;
  next: string;
  previous: string;
  results?: BlogCategoryItem[] | null;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface BlogCategoryQueryParams {
  search: string;
  paginationDetail: PaginationParams;
}
