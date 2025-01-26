import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

interface ThemeCustomizationProps {
  children: React.ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const theme = Palette('light');

  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography as any
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
