import { Theme } from '@mui/material/styles';
import { GridRowId } from '@mui/x-data-grid';
import AppTable from './AppTable';
import { ColumnConfig } from './columns';

/**
 * Props for the TableContainer component use this for tables that needs server-side features
 *
 * @template TData - The type of data in the table rows
 */
export interface TableContainerProps<TData extends object> {
  /**
   * The title of the table
   */
  title: string;

  /**
   * Custom hook that provides table data and handlers
   */
  useTableHook: () => {
    rows: TData[];
    totalRowsCount: number;
    loading: boolean;
    handleSave: (updatedRow: TData) => Promise<void>;
    handleDelete?: (id: string | number) => Promise<void>;
    handleEditClick?: (id: number | string | GridRowId) => void;
    handleviewDetailsClick?: (id: number | string | GridRowId) => Promise<void>;
    handleRowUpdateError: (error: any) => void;
    handlePaginationChange: (model: any) => void;
    handleSortChange: (model: any) => void;
    handleFilterChange: (model: any) => void;
    handleSearchChange: (searchText: string) => void;
    paginationModel: any;
    filterModel: any;
    sortModel: any;
    pageSizeOptions: number[];
  };

  /**
   * Function to get column configuration for the table
   */
  getColumnConfig: (theme: Theme) => ColumnConfig<TData>[];

  /**
   * Create new form component to be displayed when creating a new row
   */
  createNewForm?: (onClose: () => void) => React.ReactNode;

  /**
   * Title for the create button
   * @default 'Create New'
   */
  createButtonTitle?: string;

  /**
   * Whether to enable editing features
   * @default false
   */
  allowEditing?: boolean;

  /**
   * Whether to show the filter panel
   * @default false
   */
  showFilter?: boolean;

  /**
   * Whether to show the search input
   * @default true
   */
  showSearch?: boolean;

  /**
   * Whether to show the column selector
   * @default false
   */
  showColumnFilter?: boolean;

  /**
   * Whether to show the density selector
   * @default false
   */
  showDensitySelector?: boolean;

  /**
   * Whether to show the export button
   * @default false
   */
  showExport?: boolean;

  /**
   * Whether to show vertical cell borders
   * @default false
   */
  showCellVerticalBorder?: boolean;

  /**
   * Whether to enable row selection
   * @default false
   */
  enableRowSelection?: boolean;

  /**
   * Additional props to pass to the AppTable component
   */
  [key: string]: any;
}

/**
 * A generic table container that connects a data hook to the AppTable component
 *
 * @template TData - The type of data in the table rows
 *
 */
function TableContainer<TData extends object>({
  title,
  useTableHook,
  getColumnConfig,
  createNewForm,
  createButtonTitle,
  allowEditing = false,
  showFilter = false,
  showSearch = true,
  showColumnFilter = false,
  showDensitySelector = false,
  showExport = false,
  showCellVerticalBorder = false,
  enableRowSelection = false,
  ...otherProps
}: TableContainerProps<TData>) {
  // Use the provided hook to get table data and handlers
  const {
    rows,
    totalRowsCount,
    loading,
    handleSave,
    handleDelete,
    handleEditClick,
    handleviewDetailsClick,
    handleRowUpdateError,
    handlePaginationChange,
    handleSortChange,
    handleFilterChange,
    handleSearchChange,
    paginationModel,
    filterModel,
    sortModel,
    pageSizeOptions
  } = useTableHook();

  return (
    <AppTable
      title={title}
      initialRows={rows}
      totalRows={totalRowsCount}
      loading={loading}
      getColumnConfig={getColumnConfig}
      onSaveRow={handleSave}
      onDeleteRow={handleDelete}
      handleEditClick={handleEditClick}
      onViewDetailsClick={handleviewDetailsClick}
      handleRowUpdateError={handleRowUpdateError}
      handlePaginationChange={handlePaginationChange}
      handleSortChange={handleSortChange}
      handleFilterChange={handleFilterChange}
      handleSearchChange={handleSearchChange}
      paginationModel={paginationModel}
      filterModel={filterModel}
      sortModel={sortModel}
      pageSizeOptions={pageSizeOptions}
      allowEditing={allowEditing}
      showFilter={showFilter}
      showSearch={showSearch}
      showColumnFilter={showColumnFilter}
      showDensitySelector={showDensitySelector}
      showExport={showExport}
      showCellVerticalBorder={showCellVerticalBorder}
      enableRowSelection={enableRowSelection}
      createNewForm={createNewForm}
      createButtonTitle={createButtonTitle}
      {...otherProps}
    />
  );
}

export default TableContainer;
