import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { IProductItem } from '../../redux/types';

export interface ITableData extends IProductItem {
  actions?: string;
}

export const getColumnConfig = (theme: Theme): ColumnConfig<ITableData>[] => [
  { field: 'image', headerName: 'IMAGE', type: 'image' },
  { field: 'name', headerName: 'NAME', type: 'text', sortable: true },
  { field: 'sku', headerName: 'SKU', type: 'text', filterable: true, sortable: true, maxWidth: 120, minWidth: 120 },
  { field: 'category', headerName: 'CATEGORY', type: 'text', filterable: true, maxWidth: 100, minWidth: 100 },
  { field: 'unit', headerName: 'UNIT', type: 'text', maxWidth: 120, minWidth: 120 },
  { field: 'sellingPrice', headerName: 'SELLING PRICE', type: 'number', sortable: true },
  { field: 'stockAlertQty', headerName: 'ALERT QTY', type: 'number', sortable: true, maxWidth: 120, minWidth: 120 },
  {
    field: 'isActive',
    headerName: 'ACTIVE STATUS',
    type: 'boolean'
  },
  { field: 'actions', headerName: '', type: 'actions' }
];
