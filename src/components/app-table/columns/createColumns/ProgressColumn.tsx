import React, { useEffect, useRef } from 'react';

// MUI IMPORTS
import { GridColDef } from '@mui/x-data-grid';
import { Box, LinearProgress, Slider, Typography } from '@mui/material';

export const createProgressColumn = <T extends object>(baseCol: GridColDef<T>): GridColDef<T> => {
  return {
    ...baseCol,
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <LinearProgress sx={{ width: '80%', mr: 2 }} variant="determinate" value={params.value} />
        <Typography variant="subtitle2" component="span">
          {params.value}%
        </Typography>
      </Box>
    ),
    renderEditCell: (params) => <FocusableSlider params={params} />
  };
};

/**
 * FocusableSlider component for progress columns with improved tab navigation
 */
function FocusableSlider({
  params,
  min = 0,
  max = 100,
  step = 1
}: {
  params: any;
  min?: number;
  max?: number;
  step?: number;
}): JSX.Element {
  // Create a div reference instead of input reference
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentValue = params.value;
    let newValue = currentValue;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        // Decrease value by step
        newValue = Math.max(min, currentValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        // Increase value by step
        newValue = Math.min(max, currentValue + step);
        break;
      default:
        // For other keys, don't update the value
        return;
    }

    // Only update if value has changed
    if (newValue !== currentValue) {
      params.api.setEditCellValue({
        id: params.id,
        field: params.field,
        value: newValue
      });

      // Prevent default behavior (like scrolling)
      event.preventDefault();
    }
  };

  useEffect(() => {
    // When the cell receives focus, find and focus the slider thumb
    if (params.hasFocus && containerRef.current) {
      // Find the thumb element within the Slider component
      const thumbElement = containerRef.current.querySelector('.MuiSlider-thumb');
      if (thumbElement instanceof HTMLElement && document.activeElement !== thumbElement) {
        // Set tabIndex to match the expected tabIndex for proper tab flow
        thumbElement.tabIndex = params.tabIndex || 0;
        // Focus the thumb element
        thumbElement.focus();
      }
    }
  }, [params.hasFocus, params.tabIndex]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        mx: 1,
        position: 'relative',
        padding: '2px'
      }}
      // onKeyDown event handler
      onKeyDown={handleKeyDown}
    >
      <Slider
        value={params.value}
        onChange={(_, newValue) =>
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue
          })
        }
        min={min}
        max={max}
        step={step}
        tabIndex={-1}
        sx={{
          mr: 2,
          height: '4px',
          '& .MuiSlider-thumb': {
            '&.Mui-focusVisible, &:focus': {
              boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)'
            }
          }
        }}
        valueLabelDisplay="auto"
        // backup for keyboard navigation
        onKeyDown={handleKeyDown}
      />
      <Typography variant="subtitle2" component="span">
        {params.value}%
      </Typography>
    </Box>
  );
}
