import type { Components, Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - LIST ITEM ICON ||============================== //

export default function ListItemIcon(): Components<Theme> {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24
        }
      }
    }
  };
}
