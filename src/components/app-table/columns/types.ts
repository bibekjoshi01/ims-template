import { GridColDef, GridRowId } from '@mui/x-data-grid';

/**
 * BadgeColorMap defines color configurations for badge-style columns.
 */
export type BadgeColorMap = Record<string, { backgroundColor: string; color: string }>;

/**
 * ColumnConfig defines the structure of a single column in the data grid.
 */
export interface ColumnConfig<T extends object> {
  field: keyof T;
  headerName: string;
  width?: number;
  type?: 'text' | 'number' | 'select' | 'actions' | 'progress' | 'image' | 'date' | 'link' | 'boolean';
  editable?: boolean;
  valueOptions?: string[];
  renderCell?: GridColDef<T>['renderCell'];
  colorMap?: BadgeColorMap; // only for 'select' type
  trueLabel?: string; // only for 'boolean' type
  falseLabel?: string; // only for 'boolean' type
  handlers?: {
    delete?: (id: GridRowId) => Promise<Boolean>;
    copy?: (id: GridRowId) => void;
    edit?: (id: GridRowId) => void;
    save?: (id: GridRowId) => void;
    cancel?: (id: GridRowId) => void;
  };
}

/**
 * Common handlers interface for column actions
 */
export interface ColumnHandlers {
  delete: (id: GridRowId) => Promise<void>;
  copy: (id: GridRowId) => void;
  edit: (id: GridRowId) => void;
  save: (id: GridRowId) => void;
  cancel: (id: GridRowId) => void;
}
