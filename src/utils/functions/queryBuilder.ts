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

  // Ordering
  const orderingField = sortModel?.[0]?.field;
  const ordering = orderingField ? camelCaseToSnakeCase(orderingField) : '';
  const direction = sortModel?.[0]?.sort === 'asc' ? '' : '-';
  const orderingString = ordering ? `${direction}${ordering}` : '';

  // Filtering
  const filterItem = filterModel?.items?.[0];
  const filterField = filterItem?.field;
  const filterFieldSnake = filterField ? camelCaseToSnakeCase(filterField) : '';
  const filterValue = filterItem?.value || '';
  const filterString = filterField ? `${filterFieldSnake}=${filterValue}` : '';

  return {
    page,
    pageSize,
    orderingString,
    filterString,
    search
  };
};
