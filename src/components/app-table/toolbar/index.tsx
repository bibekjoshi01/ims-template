import React from 'react';

// MUI IMPORTS
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {
  GridMoreVertIcon,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  useGridApiContext
} from '@mui/x-data-grid';

// PROJECT IMPORTS
import AppDialog from '@/components/app-dialog';
import { CustomSearchBar } from './Slots';
import { ContainerStyles, MenuItemStyles, TitleStyles, ToolbarStyles } from './styles';
import { ToolbarProps } from './types';
import { useToolbarHandlers } from './useToolbarHandlers';

// ==============================
// Toolbar
// ==============================
const Toolbar = ({
  title,
  showSearch,
  handleSearchChange,
  handleTextChange,
  searchText,
  filterMode,
  showColumnFilter,
  showFilter,
  showDensitySelector,
  showExport,
  createNewForm,
  saveExportComponent,
  createButtonTitle
}: ToolbarProps) => {
  const { anchorEl, showForm, openMenu, handleMenuClick, handleMenuClose, handleOpenForm, handleCloseForm } = useToolbarHandlers({
    filterMode,
    handleSearchChange,
    searchText
  });

  const apiRef = useGridApiContext();
  const hasRows = apiRef.current.getRowsCount() > 0;

  return (
    <>
      <Box sx={ContainerStyles}>
        {/* Title */}
        {title && (
          <Typography variant="h4" sx={TitleStyles}>
            {title}
          </Typography>
        )}

        {/* Toolbar */}
        <Box sx={ToolbarStyles}>
          {/* Search Bar */}
          {showSearch && <CustomSearchBar searchText={searchText} handleInputChange={handleTextChange} />}

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
          {hasRows && (
            <Box>
              <IconButton onClick={handleMenuClick}>
                <GridMoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                {showColumnFilter && (
                  <MenuItem sx={MenuItemStyles}>
                    <GridToolbarColumnsButton />
                  </MenuItem>
                )}
                {showFilter && (
                  <MenuItem sx={MenuItemStyles} onClick={handleMenuClose}>
                    <GridToolbarFilterButton />
                  </MenuItem>
                )}
                {showDensitySelector && (
                  <MenuItem sx={MenuItemStyles}>
                    <GridToolbarDensitySelector />
                  </MenuItem>
                )}
                <MenuItem sx={MenuItemStyles}>
                  <GridToolbarColumnsButton />
                </MenuItem>
                {showExport && <MenuItem sx={MenuItemStyles}>{saveExportComponent}</MenuItem>}
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Toolbar);
