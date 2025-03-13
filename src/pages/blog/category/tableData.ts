import { ColumnConfig } from '@/components/app-table/columns';
import { Theme } from '@mui/material/styles';
import { BlogCategoryItem } from '../redux/types';

// Initial Employee Data
export const rowValues: BlogCategoryItem[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    slug: 'bibek-dk',
    parent: null,
    description: 'ksljfd',
    postCount: 34
  },
  {
    id: 1,
    name: 'Alice Johnson',
    slug: 'bibek-dk',
    parent: null,
    postCount: 34,
    description: 'ksljfd'
  },
  {
    id: 1,
    name: 'Alice Johnson',
    slug: 'bibek-dk',
    parent: null,
    postCount: 34,
    description: 'ksljfd'
  }
];

// Employee Table Column Config
export const getColumnConfig = (theme: Theme): ColumnConfig<any>[] => [
  { field: 'name', headerName: 'NAME', width: 120, type: 'text' },
  { field: 'description', headerName: 'DESCRIPTION', width: 120, type: 'text' },
  { field: 'slug', headerName: 'SLUG', width: 120, type: 'text' },
  { field: 'postCount', headerName: 'POST COUNT', width: 120, type: 'number' },

  { field: 'actions', headerName: '', width: 100, type: 'actions' }
];
