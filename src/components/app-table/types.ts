import { Theme } from '@mui/material/styles';
import { DataGridProps, GridFilterModel, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import { ColumnConfig } from './columns';

/**
 * AppTableProps defines the expected properties for the AppTable component.
 *
 * @template T - Type of the row data object. This should be defined as a generic type (e.g., TableData)
 * when using AppTable.
 */
// ===========================|| AppTable - COMPONENT INTERFACE ||=========================== //

export interface AppTableProps<T extends object> {
  /**
   * Title displayed at the top of the table.
   * Default is undefined.
   */
  title?: string;

  /**
   * Array of rows to be displayed in the table.
   * Default is [].
   */
  initialRows?: T[];

  /**
   * Function that returns column configuration based on the current theme.
   * Required.
   *
   * @param theme - The current MUI theme object
   * @returns Array of column configurations for the table
   */
  getColumnConfig: (theme: Theme) => ColumnConfig<T>[];

  /**
   * Function to handle saving an updated row.
   * Called when a row edit is committed.
   * Default is undefined.
   *
   * @param updatedRow - The row data after edits
   * @returns Promise that resolves when the save operation completes
   */
  onSaveRow?: (updatedRow: T) => Promise<void> | undefined;

  /**
   * Function to handle deleting a row.
   * Called when a row deletion is requested.
   * Default is undefined.
   *
   * @param id - The ID of the row to delete
   * @returns Promise that resolves when the delete operation completes
   */
  onDeleteRow?: (id: GridRowId) => Promise<void> | undefined;

  /**
   * Function to handle row edit button click.
   * Default is undefined.
   *
   * @param id - The ID of the row to edit
   */
  handleEditClick: ((id: number | string | GridRowId) => void) | undefined;

  /**
   * Indicates if the table is in a loading state.
   * When true, displays a skeleton loader.
   * Default is false.
   */
  loading?: boolean;

  /**
   * Function to handle errors during row update operations.
   * Default is undefined.
   *
   * @param error - The error that occurred during the update
   */
  handleRowUpdateError?: (error: any) => void;

  /**
   * Shows vertical borders between cells when true.
   * Default is false.
   */
  showCellVerticalBorder?: boolean;

  /**
   * Shows the search input in the toolbar when true.
   * Default is true.
   */
  showSearch?: boolean;

  /**
   * Shows the column selector button in the toolbar when true.
   * Default is false.
   */
  showColumnFilter?: boolean;

  /**
   * Shows the filter button in the toolbar when true.
   * Default is false.
   */
  showFilter?: boolean;

  /**
   * Shows the density selector in the toolbar when true.
   * Default is false.
   */
  showDensitySelector?: boolean;

  /**
   * Shows the export button in the toolbar when true.
   * Default is false.
   */
  showExport?: boolean;

  /**
   * Enables column sorting functionality when true.
   * Default is true.
   */
  allowSorting?: boolean;

  /**
   * Enables row editing functionality when true.
   * Default is false.
   */
  allowEditing?: boolean;

  /**
   * Specifies the edit mode of the table: 'row' or 'cell'.
   * Only applicable when allowEditing is true.
   * Default is 'row'.
   */
  editMode?: 'row' | 'cell';

  /**
   * Enables column resizing functionality when true.
   * Default is false.
   */
  enableColumnResizing?: boolean;

  /**
   * Enables row selection (checkboxes) when true.
   * Default is false.
   */
  enableRowSelection?: boolean;

  /**
   * Specifies the pagination mode: 'client' or 'server'.
   * Default is 'server'.
   */
  paginationMode?: 'client' | 'server';

  /**
   * Specifies the sorting mode: 'client' or 'server'.
   * Default is 'server'.
   */
  sortingMode?: 'client' | 'server';

  /**
   * Specifies the filtering mode: 'client' or 'server'.
   * Default is 'server'.
   */
  filterMode?: 'client' | 'server';

  /**
   * Current pagination state of the table.
   * Default is { page: 0, pageSize: 10 }.
   */
  paginationModel?: GridPaginationModel;

  /**
   * Current filter state of the table.
   * Default is { items: [] }.
   */
  filterModel?: GridFilterModel;

  /**
   * Current sort state of the table.
   * Default is [].
   */
  sortModel?: GridSortModel;

  /**
   * Available page size options for the pagination dropdown.
   * Default is [3, 5, 10, 20, 50, 100].
   */
  pageSizeOptions?: number[];

  /**
   * Function called when sort model changes.
   * Required when sortingMode is 'server'.
   *
   * @param sortModel - The new sort model
   */
  handleSortChange?: (sortModel: GridSortModel) => void;

  /**
   * Function called when filter model changes.
   * Required when filterMode is 'server'.
   *
   * @param filterModel - The new filter model
   */
  handleFilterChange?: (filterModel: GridFilterModel) => void;

  /**
   * Function called when pagination model changes.
   * Required when paginationMode is 'server'.
   *
   * @param paginationModel - The new pagination model
   */
  handlePaginationChange?: (paginationModel: GridPaginationModel) => void;

  /**
   * Function called when search input changes.
   *
   * @param searchText - The current search text
   */
  handleSearchChange?: (searchText: string) => void;

  /**
   * Total number of rows for server-side pagination.
   * Required when paginationMode is 'server'.
   * Default is 0.
   */
  totalRows?: number;

  /**
   * Default filename when exporting table data.
   * Default is 'table_data'.
   */
  exportFileName?: string;

  /**
   * Function to extract row ID from row data.
   * Default uses row.id if not provided.
   *
   * @param row - The row data
   * @returns Unique identifier for the row
   */
  getRowId?: (row: T) => string | number;

  /**
   * Form to be displayed when creating a new row.
   *
   */
  createNewForm?: (onClose: () => void) => React.ReactNode;

  /**
   * Additional styles to apply to the container Box component.
   * Default is undefined.
   */
  containerSx?: object;

  /**
   * Any additional props that can be passed to the MUI DataGrid.
   * These will be spread to the underlying DataGrid component.
   */
  [key: string]: any;
}
