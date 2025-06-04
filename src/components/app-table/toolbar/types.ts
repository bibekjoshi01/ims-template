export interface ToolbarProps {
  title?: string;
  showSearch: boolean;
  handleSearchChange?: (value: string) => void;
  handleTextChange?: (value: string) => void;
  searchText: string;
  filterMode: 'server' | 'client';
  showColumnFilter: boolean;
  showFilter: boolean;
  showDensitySelector: boolean;
  showExport: boolean;
  createNewForm?: (onClose: () => void) => React.ReactNode;
  saveExportComponent?: React.ReactNode;
  createButtonTitle?: string;
}
