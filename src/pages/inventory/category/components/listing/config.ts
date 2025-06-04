import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { ICategoryItem } from '../../redux/types';

export interface ITableData extends ICategoryItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'icon', headerName: 'ICON', type: 'image' },
  { field: 'name', headerName: 'NAME', type: 'text', filterable: true, sortable: true },
  { field: 'code', headerName: 'CODE NAME', type: 'text', filterable: true, sortable: true },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean'
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
