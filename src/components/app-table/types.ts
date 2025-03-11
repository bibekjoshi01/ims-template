import {
  DataGridProps,
  GridColDef,
  GridPaginationModel,
  GridRowEditStopParams,
  GridRowId,
  GridRowModesModel,
  MuiEvent
} from '@mui/x-data-grid';

/**
 * AppTableProps defines the expected properties for the AppTable component.
 *
 * @template T - Type of the row data object
 */
// ===========================|| AppTable - COMPONENT INTERFACE ||=========================== //

export interface AppTableProps<T extends object> extends DataGridProps {
  /**
   * Title of the table.
   * Default is undefined.
   */
  title?: string;

  /**
   * Array of column definitions for the DataGrid.
   * (Required, no default value)
   */
  columns: GridColDef<T>[];

  /**
   * Array of rows to be displayed in the table.
   * (Required, no default value)
   */
  rows: T[];

  /**
   * Boolean to indicate if the table is in a loading state.
   * Default is `false`.
   */
  loading?: boolean;

  /**
   * Additional styles for the container.
   * Default is `undefined`.
   */
  containerSx?: any;

  /**
   * State that holds rows that are in edit mode.
   * Default is `undefined`.
   */
  rowModesModel?: GridRowModesModel;

  /**
   * Function to change rows in edit mode.
   * Default is `undefined`.
   */
  onRowModesModelChange?: (model: GridRowModesModel) => void;

  /**
   * Function to process updates to a row.
   * Default is `undefined`.
   */
  processRowUpdate?: (newRow: T, oldRow: T) => T | Promise<T>;

  /**
   * Function to process updates to a row.
   * Default is `undefined`.
   */
  handleRowUpdateError?: (error: any) => void;

  /**
   * Function to handle row editing commit.
   * Default is `undefined`.
   */
  onRowEditCommit?: (newRow: T, oldRow: T, params: { rowId: GridRowId }) => T | Promise<T>;

  /**
   * Boolean to show or hide vertical cell borders.
   * Default is `false`.
   */
  showCellVerticalBorder?: boolean;

  /**
   * Boolean to show or hide the search option.
   * Default is `true`.
   */
  showSearch?: boolean;

  /**
   * Boolean to show or hide the column filter option.
   * Default is `true`.
   */
  showColumnFilter?: boolean;

  /**
   * Boolean to show or hide the filter option.
   * Default is `true`.
   */
  showFilter?: boolean;

  /**
   * Boolean to show or hide the density selector.
   * Default is `true`.
   */
  showDensitySelector?: boolean;

  /**
   * Boolean to show or hide the export option.
   * Default is `true`.
   */
  showExport?: boolean;

  /**
   * Boolean to enable sorting in the table.
   * Default is `true`.
   */
  allowSorting?: boolean;

  /**
   * Boolean to enable editing in the table.
   * Default is `false`.
   */
  allowEditing?: boolean;

  /**
   * The edit mode of the table, either "row" or "cell".
   * Default is `'row'`.
   */
  editMode?: 'row' | 'cell';

  /**
   * Boolean to enable column resizing.
   * Default is `false`.
   */
  enableColumnResizing?: boolean;

  /**
   * Boolean to enable row selection.
   * Default is `false`.
   */
  enableRowSelection?: boolean;

  /**
   * Options for the page size dropdown in pagination.
   * Default is `[5, 10, 15, 20]`.
   */
  pageSizeOptions?: number[];

  /**
   * Boolean to indicate whether pagination is server-side.
   * Default is `false`.
   */
  serverPagination?: boolean;

  /**
   * Total number of rows for pagination.
   * Default is the length of the `rows` array.
   */
  totalRows?: number;

  /**
   * Function to handle pagination changes.
   * Default is `undefined`.
   */
  onPaginationChange?: (model: GridPaginationModel) => void;

  /**
   * The default file name for exported data.
   * Default is `'table_data'`.
   */
  exportFileName?: string;

  /**
   * Function to get the row id from row data.
   * Default is `undefined`.
   */
  getRowId?: (row: T) => string | number;

  /**
   * Any additional props that can be passed to the DataGrid.
   */
  [key: string]: any;
}
