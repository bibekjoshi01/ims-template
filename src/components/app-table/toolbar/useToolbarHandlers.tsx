import { useState, useEffect } from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { debounce } from '@/utils/functions/debounce';

interface useToolbarHandlersProps {
  filterMode: 'server' | 'client';
  handleSearchChange?: (value: string) => void;
}

export function useToolbarHandlers({ filterMode, handleSearchChange }: useToolbarHandlersProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiContext();
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    if (filterMode === 'server' && handleSearchChange) {
      const debounced = debounce((value: string) => {
        handleSearchChange(value);
      }, 300);

      debounced(searchText);

      return () => {
        debounced.cancel?.();
      };
    } else {
      const searchTerms = searchText
        .split(',')
        .map((term) => term.trim())
        .filter((term) => term !== '');
      apiRef.current.setQuickFilterValues(searchTerms);
    }
  }, [searchText, filterMode, handleSearchChange, apiRef]);

  return {
    anchorEl,
    setAnchorEl,
    showForm,
    openMenu,
    searchText,
    handleMenuClick,
    handleMenuClose,
    handleOpenForm,
    handleCloseForm,
    handleInputChange
  };
}
