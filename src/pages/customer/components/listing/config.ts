import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { ICustomerItem } from '../../redux/types';

export interface ITableData extends ICustomerItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'customerNo', headerName: 'CUSTOMER NO.', type: 'text', filterable: true },
  { field: 'fullName', headerName: 'FULL NAME', type: 'text', sortable: true },
  { field: 'email', headerName: 'EMAIL', type: 'text', minWidth: 200, filterable: true },
  { field: 'phoneNo', headerName: 'PHONE NO.', type: 'text', filterable: true },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean',
    filterable: true
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
