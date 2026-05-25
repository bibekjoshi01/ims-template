import type { Components, Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs(): Components<Theme> {
  return {
    MuiTabs: {
      styleOverrides: {
        vertical: {
          overflow: 'visible'
        }
      }
    }
  };
}
