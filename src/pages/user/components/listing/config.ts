import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { UserItem } from '../../redux/types';

export interface TableData extends Omit<UserItem, 'firstName' | 'middleName' | 'lastName'> {
  name: string;
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<TableData>[] => [
  { field: 'photo', headerName: 'PHOTO', type: 'image' },
  { field: 'username', headerName: 'USER NAME', type: 'text', editable: false },
  { field: 'name', headerName: 'NAME', type: 'text', filterable: false },
  { field: 'phoneNo', headerName: 'PHONE NO.', type: 'text' },
  { field: 'email', headerName: 'EMAIL', type: 'text', editable: false, minWidth: 200 },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean',
    filterable: false
  },
  { field: 'dateJoined', headerName: 'CREATED AT', type: 'date', editable: false, filterable: false },
  { field: 'actions', headerName: '', type: 'actions' }
];
