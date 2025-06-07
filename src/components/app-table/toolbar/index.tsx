import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {
  GridMoreVertIcon,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiContext,
  GridToolbarContainer
} from '@mui/x-data-grid';

import AppDialog from '@/components/app-dialog';
import SaveExport from '@/components/export';
import { ContainerStyles, MenuItemStyles, TitleStyles, ToolbarStyles } from './styles';
import { ToolbarProps } from './types';

const CombinedToolbar = React.forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const {
    title,
    showSearch,
    createNewForm,
    createButtonTitle,
    showColumnFilter,
    showFilter,
    showDensitySelector,
    showExport,
    exportFileName,
    ...gridToolbarProps
  } = props;

  const apiRef = useGridApiContext();
  const [showForm, setShowForm] = useState(false);
  const [hasRows, setHasRows] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  // Menu open/close handlers
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Dialog handlers
  const handleOpenForm = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  // Check for rows
  useEffect(() => {
    const checkRows = () => setHasRows(apiRef.current.getRowsCount() > 0);
    checkRows();
    const unsubscribe = apiRef.current.subscribeEvent('rowsSet', checkRows);
    return () => unsubscribe();
  }, [apiRef]);

  return (
    <GridToolbarContainer ref={ref} {...gridToolbarProps}>
      <Box sx={ContainerStyles}>
        {/* Title */}
        {title && (
          <Typography variant="h4" sx={TitleStyles}>
            {title}
          </Typography>
        )}

        {/* Controls */}
        <Box sx={ToolbarStyles}>
          {/* Searchbar */}
          <GridToolbarQuickFilter
            variant="outlined"
            placeholder="Search..."
            sx={{
              minWidth: 200,
              '& .MuiInputBase-root': {
                backgroundColor: 'background.paper'
              }
            }}
          />
          {/* Create New Button */}
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
              {showExport && hasRows && (
                <MenuItem sx={MenuItemStyles}>
                  <SaveExport title={exportFileName ?? title} />
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Create New Form Dialog */}
      {createNewForm && (
        <AppDialog open={showForm} onClose={handleCloseForm} content={createNewForm(handleCloseForm)} fullWidth maxWidth="lg" />
      )}
    </GridToolbarContainer>
  );
});

CombinedToolbar.displayName = 'CombinedToolbar';

export default React.memo(CombinedToolbar);
