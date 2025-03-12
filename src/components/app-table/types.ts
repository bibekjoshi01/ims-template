import { Theme } from '@mui/material/styles';
import { DataGridProps, GridPaginationModel, GridRowId, GridRowModesModel } from '@mui/x-data-grid';
import { ColumnConfig } from './columns';

/**
 * AppTableProps defines the expected properties for the AppTable component.
 *
 * @template T - Type of the row data object this is something you'll define as TableData and pass it to Apptable
 */
// ===========================|| AppTable - COMPONENT INTERFACE ||=========================== //

export interface AppTableProps<T extends object> {
  /**
   * Title of the table.
   * Default is undefined.
   */
  title?: string;

  /**
   * Array of rows to be displayed in the table.
   * (Default is []).
   */
  initialRows?: T[];

  /**
   * Function to get the column configuration.
   * Required`.
   */
  getColumnConfig: (theme: Theme) => ColumnConfig<T>[];

  /**
   * Function to handle saving an updated row.
   * Default is `undefined`.
   */
  onSaveRow?: (updatedRow: T) => Promise<T | void>;

  /**
   * Function to handle deleting a row.
   * Default is `undefined`.
   */
  onDeleteRow?: (id: GridRowId) => Promise<GridRowId | void>;

  /**
   * Boolean to indicate if the table is in a loading state.
   * Default is `false`.
   */
  loading?: boolean;

  /**
   * Function to process updates to a row.
   * Default is `undefined`.
   */
  handleRowUpdateError?: (error: any) => void;

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
   * Additional styles for the container.
   * Default is `undefined`.
   */
  containerSx?: any;

  /**
   * Any additional props that can be passed to the DataGrid.
   */
  [key: string]: any;
}
