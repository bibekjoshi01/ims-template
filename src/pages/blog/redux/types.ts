import { PaginationParams } from '@/globals';

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

export interface BlogCategoryQueryParams {
  search: string;
  paginationDetail: PaginationParams;
}
