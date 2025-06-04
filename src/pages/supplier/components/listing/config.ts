import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { ISupplierItem } from '../../redux/types';

export interface ITableData extends ISupplierItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'name', headerName: 'NAME', type: 'text', filterable: false, sortable: true },
  { field: 'contactPerson', headerName: 'CONTACT PERSON', type: 'text', filterable: false, sortable: true },
  { field: 'email', headerName: 'EMAIL', type: 'text', minWidth: 200, sortable: true },
  { field: 'phoneNo', headerName: 'PHONE NO.', type: 'text' },
  { field: 'altPhoneNo', headerName: 'ALT. PHONE NO.', type: 'text' },
  { field: 'address', headerName: 'ADDRESS', type: 'text', minWidth: 200, visible: false, filterable: false },
  { field: 'country', headerName: 'COUNTRY', type: 'text', visible: false },
  { field: 'website', headerName: 'WEBSITE', type: 'text', visible: false },
  { field: 'taxId', headerName: 'TAX ID', type: 'text', visible: false },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean'
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
