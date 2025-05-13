import React, { useEffect, useState } from 'react';

// MUI IMPORTS
import { Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, GlobalStyles, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {
  GridColumnsPanel,
  GridFilterPanel,
  GridMoreVertIcon,
  GridPanel,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiContext
} from '@mui/x-data-grid';
import { GridFilterPanelProps } from '@mui/x-data-grid/components/panel/filterPanel/GridFilterPanel';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';
import CustomInput from '@/components/CustomInput';
import { debounce } from '@/utils/debounce';

// ==============================
// Custom Search Bar
// ==============================
const CustomSearchBar = ({ handleInputChange, searchText }: { handleInputChange?: (value: string) => void; searchText: string }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange?.(event.target.value);
  };

  return (
    <CustomInput
      autoFocus
      placeholder="Search..."
      type="text"
      value={searchText}
      onChange={onChange}
      startAdornment={<SearchIcon sx={{ height: '20px' }} color="action" />}
      sx={{
        displayPrint: 'none',
        display: 'flex',
        flex: 1
      }}
    />
  );
};

// ==============================
// Custom Columns Panel
// ==============================
export const CustomColumnsPanel = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          '& [data-popper-placement="bottom-start"]': {
            display: 'none !important'
          }
        }}
      />
      <GridPanel open={true} placement="bottom-end">
        <GridColumnsPanel />
      </GridPanel>
    </>
  );
};

// ==============================
// Custom Filter Panel
// ==============================
export const CustomFilterPanel = (props: GridFilterPanelProps) => {
  return (
    <>
      <GlobalStyles
        styles={{
          '& [data-popper-placement="bottom-start"]': {
            display: 'none !important'
          }
        }}
      />
      <GridPanel open={true} placement="bottom-end">
        <GridFilterPanel {...props} />
      </GridPanel>
    </>
  );
};

// ==============================
// Toolbar
// ==============================
const Toolbar = ({
  title,
  showSearch,
  handleSearchChange,
  filterMode,
  showColumnFilter,
  showFilter,
  showDensitySelector,
  showExport,
  createNewForm,
  createButtonTitle
}: {
  title?: string;
  showSearch: boolean;
  handleSearchChange?: (value: string) => void;
  filterMode: string;
  showColumnFilter: boolean;
  showFilter: boolean;
  showDensitySelector: boolean;
  showExport: boolean;
  createNewForm?: (onClose: () => void) => React.ReactNode;
  createButtonTitle?: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
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
      // For client: apply filter immediately without debounce
      const searchTerms = searchText
        .split(',')
        .map((term) => term.trim())
        .filter((term) => term !== '');
      apiRef.current.setQuickFilterValues(searchTerms);
    }
  }, [searchText, filterMode, handleSearchChange, apiRef]);

  // Called immediately on input change
  const handleInputChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          px: 1
        }}
      >
        {/* Title */}
        {title && (
          <Typography
            variant="h4"
            sx={{
              displayPrint: 'none',
              px: 2,
              py: 3,
              fontWeight: 900
            }}
          >
            {title}
          </Typography>
        )}

        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: { xs: 'flex-start', sm: 'center' },
            width: { xs: '100%', sm: 'auto' },
            displayPrint: 'none'
          }}
        >
          {/* Search Bar */}
          {showSearch && <CustomSearchBar searchText={searchText} handleInputChange={handleInputChange} />}

          {/* Create New User Button */}
          {createNewForm && (
            <>
              <Button onClick={handleOpenForm} variant="contained" sx={{ mx: 1 }}>
                {createButtonTitle ?? 'Create New'}
              </Button>
              <AppDialog open={showForm} onClose={handleCloseForm} content={createNewForm(handleCloseForm)} fullWidth maxWidth="lg" />
            </>
          )}

          {/* Menu icon */}
          <Box>
            <IconButton onClick={handleMenuClick}>
              <GridMoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              {showColumnFilter && (
                <MenuItem>
                  <GridToolbarColumnsButton />
                </MenuItem>
              )}
              {showFilter && (
                <MenuItem onClick={handleMenuClose}>
                  <GridToolbarFilterButton />
                </MenuItem>
              )}
              {showDensitySelector && (
                <MenuItem>
                  <GridToolbarDensitySelector />
                </MenuItem>
              )}
              {showExport && (
                <MenuItem>
                  <GridToolbarExport />
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Toolbar;
