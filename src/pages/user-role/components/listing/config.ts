import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { UserRole } from '../../redux/types';

export interface TableData extends UserRole {
  name: string;
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'name', headerName: 'NAME', type: 'text', filterable: true },
  { field: 'codename', headerName: 'CODE NAME', type: 'text', filterable: true, sortable: true },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean'
  },
  { field: 'createdAt', headerName: 'CREATED AT', type: 'date', editable: false, sortable: true },
  { field: 'actions', headerName: '', type: 'actions' }
];
