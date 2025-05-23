import isEqual from 'fast-deep-equal';
import { useEffect, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project imports
import { useThemeMode } from '@/contexts/theme-context';
import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

interface ThemeCustomizationProps {
  children: React.ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { mode, colorValues, setThemeSettings } = useThemeMode();
  const [theme, generatedPaletteColors] = useMemo(() => Palette(mode, colorValues), [mode, colorValues]);

  // Update colorValues only when the generated colors differ from current values
  useEffect(() => {
    if (!isEqual(colorValues, generatedPaletteColors)) {
      setThemeSettings((cur) => ({ ...cur, colorValues: generatedPaletteColors }));
    }
  }, [generatedPaletteColors, colorValues, setThemeSettings]);

  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      breakpoints: {
        values: {
          xxs: 0,
          xs: 480,
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
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = useMemo(() => {
    const createdTheme = createTheme(themeOptions);
    createdTheme.components = componentsOverride(createdTheme);
    return createdTheme;
  }, [themeOptions]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
