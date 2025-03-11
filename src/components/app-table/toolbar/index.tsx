import React, { useState } from 'react';

// MUI IMPORTS
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
import { Box, GlobalStyles, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { GridFilterPanelProps } from '@mui/x-data-grid/components/panel/filterPanel/GridFilterPanel';

// PROJECT IMPORTS
import CustomInput from '@/components/CustomInput';

// ==============================
// Custom Search Bar
// ==============================
const CustomSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiContext();

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);

    // Apply the filter to the grid
    const searchTerms = value
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term !== '');

    apiRef.current.setQuickFilterValues(searchTerms);
  };

  return (
    <CustomInput
      placeholder="Search..."
      type="text"
      value={searchText}
      onChange={handleSearchChange}
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
  showColumnFilter,
  showFilter,
  showDensitySelector,
  showExport
}: {
  title?: string;
  showSearch: boolean;
  showColumnFilter: boolean;
  showFilter: boolean;
  showDensitySelector: boolean;
  showExport: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        p: 1
      }}
    >
      {title && (
        <Typography
          variant="h6"
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

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: { xs: '100%', sm: 'auto' },
          displayPrint: 'none'
        }}
      >
        {showSearch && <CustomSearchBar />}

        {/* Desktop toolbar */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {showColumnFilter && <GridToolbarColumnsButton />}
          {showFilter && <GridToolbarFilterButton />}
          {showDensitySelector && <GridToolbarDensitySelector />}
          {showExport && <GridToolbarExport />}
        </Box>

        {/* Menu icon for mobile */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton onClick={handleMenuClick}>
            <GridMoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            {showColumnFilter && (
              <MenuItem onClick={handleMenuClose}>
                <GridToolbarColumnsButton />
              </MenuItem>
            )}
            {showFilter && (
              <MenuItem onClick={handleMenuClose}>
                <GridToolbarFilterButton />
              </MenuItem>
            )}
            {showDensitySelector && (
              <MenuItem onClick={handleMenuClose}>
                <GridToolbarDensitySelector />
              </MenuItem>
            )}
            {showExport && (
              <MenuItem onClick={handleMenuClose}>
                <GridToolbarExport />
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Toolbar;
