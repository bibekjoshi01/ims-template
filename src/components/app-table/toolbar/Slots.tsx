import React from 'react';
import { GlobalStyles } from '@mui/material';
import { GridColumnsPanel, GridPanel } from '@mui/x-data-grid';
import { GridFilterPanel, GridFilterPanelProps } from '@mui/x-data-grid/components/panel/filterPanel/GridFilterPanel';

// ==============================
// Custom Columns Panel
// ==============================
export const CustomColumnsPanel = React.memo(() => {
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
});

// ==============================
// Custom Filter Panel
// ==============================
export const CustomFilterPanel = React.memo((props: GridFilterPanelProps) => {
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
});
