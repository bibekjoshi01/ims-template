import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { ICategoryItem } from '../../redux/types';

export interface ITableData extends ICategoryItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'icon', headerName: 'ICON', type: 'image' },
  { field: 'name', headerName: 'NAME', type: 'text', filterable: false },
  { field: 'code', headerName: 'CODE NAME', type: 'text' },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean',
    filterable: false,
    sortable: false
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
