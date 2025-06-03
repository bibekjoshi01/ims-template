import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { camelCaseToSnakeCase } from './formatString';

export interface IQueryParams {
  search: string;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
}

export const getQueryParams = ({ search, paginationModel, sortModel, filterModel }: IQueryParams) => {
  const { page, pageSize } = paginationModel!;
  // ordering
  const ordering = sortModel?.[0]?.field;
  const direction = sortModel?.[0]?.sort === 'asc' ? '-' : '';
  const orderingString = ordering ? `${direction}${ordering}` : '';

  // filtering
  const filterField = filterModel?.items?.[0]?.field;
  const filterFieldNameInSnakeCase = filterField && camelCaseToSnakeCase(filterField);
  const filterValue = filterModel?.items?.[0]?.value;
  const filterString = filterField && filterValue ? `${filterFieldNameInSnakeCase}=${filterValue}` : '';

  return { page, pageSize, orderingString, filterString, search };
};
