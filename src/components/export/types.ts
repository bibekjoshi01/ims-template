import { GridStateColDef } from '@mui/x-data-grid/internals';

export type IColumn = GridStateColDef & {
  field: string;
  headerName?: string;
  fieldType?: string;
  visible?: boolean;
  [key: string]: any;
};
