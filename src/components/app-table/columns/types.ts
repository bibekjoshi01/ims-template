import { GridAlignment, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';

/**
 * BadgeColorMap defines color configurations for badge-style columns.
 */
export type BadgeColorMap = Record<string, { backgroundColor: string | undefined; color: string }>;

/**
 * Common handlers interface for column actions
 */
export interface ColumnHandlers<T> {
  delete: (id: GridRowId) => void;
  viewDetails: (id: GridRowId) => void;
  editInline: (id: GridRowId) => void;
  editForm: (id: GridRowId) => void;
  save: (id: GridRowId) => void;
  cancel: (id: GridRowId) => void;
  processRowUpdate: (updatedRow: T) => Promise<T>;
}

/**
 * ColumnConfig defines the structure of a single column in the data grid.
 */
export interface ColumnConfig<T extends object> {
  field: keyof T | 'index';
  headerName: string;
  maxWidth?: number;
  minWidth?: number;
  type?: 'text' | 'richText' | 'number' | 'select' | 'actions' | 'progress' | 'image' | 'date' | 'link' | 'boolean'; // richText and actions are always non-editable
  editable?: boolean; // default true
  filterable?: boolean; // default false
  sortable?: boolean; // default false
  valueOptions?: { label: string; value: string | number | boolean }[]; // only for 'select' type
  renderCell?: GridColDef<T>['renderCell'];
  colorMap?: BadgeColorMap; // only for 'select' type
  trueLabel?: string; // only for 'boolean' type
  falseLabel?: string; // only for 'boolean' type
  handlers?: ColumnHandlers<T>;
  align?: GridAlignment; // left | right | center
  visible?: boolean;
  handleChange?: (id: GridRowId, value: T[keyof T]) => void;
  customActions?: ((params: GridRowParams<T>) => JSX.Element)[];
}
