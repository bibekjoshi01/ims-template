import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { UserRole } from '../redux/types';

export interface TableData extends UserRole {
  name: string;
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'name', headerName: 'NAME', type: 'text' },
  { field: 'codename', headerName: 'CODE NAME', type: 'text' },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean',
    filterable: false
  },
  { field: 'createdAt', headerName: 'CREATED AT', type: 'date', editable: false, filterable: false },
  { field: 'actions', headerName: '', type: 'actions', deletable: false }
];
