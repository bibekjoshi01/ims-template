import type { Components, Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(): Components<Theme> {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12
        }
      }
    }
  };
}
