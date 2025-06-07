import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { ICustomerItem } from '../../redux/types';

export interface ITableData extends ICustomerItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'photo', headerName: 'PHOTO', type: 'image' },
  { field: 'fullName', headerName: 'FULL NAME', type: 'text', sortable: true },
  { field: 'customerNo', headerName: 'CUSTOMER NO.', type: 'text', filterable: true },
  { field: 'email', headerName: 'EMAIL', type: 'text', filterable: true },
  { field: 'phoneNo', headerName: 'PHONE NO.', type: 'text', filterable: true },
  // { field: 'altPhoneNo', headerName: 'ALT PHONE NO.', type: 'text', filterable: true },
  {
    field: 'isPerson',
    headerName: 'IS PERSON',
    type: 'boolean',
    filterable: true
  },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean',
    filterable: true
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
