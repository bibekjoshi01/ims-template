import AppTable from './AppTable';
import { TableContainerProps } from './types';

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
  showIndex = true,
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
      showIndex={showIndex}
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
