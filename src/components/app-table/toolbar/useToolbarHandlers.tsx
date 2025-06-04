import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { debounce } from '@/utils/functions/debounce';

interface UseToolbarHandlersProps {
  filterMode: 'server' | 'client';
  handleSearchChange?: (value: string) => void;
  searchText: string;
}

export function useToolbarHandlers({ filterMode, handleSearchChange, searchText }: UseToolbarHandlersProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);
  const apiRef = useGridApiContext();

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenForm = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  // Memoize the debounced handler
  const debouncedSearchChange = useMemo(() => {
    if (filterMode !== 'server' || !handleSearchChange) return null;
    return debounce(handleSearchChange, 300);
  }, [filterMode, handleSearchChange]);

  useEffect(() => {
    if (filterMode === 'server' && debouncedSearchChange) {
      debouncedSearchChange(searchText);

      return () => {
        debouncedSearchChange.cancel?.();
      };
    } else {
      // client filtering logic
      const searchTerms = searchText
        .split(',')
        .map((term) => term.trim())
        .filter((term) => term !== '');
      apiRef.current.setQuickFilterValues(searchTerms);
    }
  }, [searchText, filterMode, debouncedSearchChange, apiRef]);

  return {
    anchorEl,
    showForm,
    openMenu,
    handleMenuClick,
    handleMenuClose,
    handleOpenForm,
    handleCloseForm
  };
}
