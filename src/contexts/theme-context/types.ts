import { PaletteMode } from '@mui/material';

export interface ColorVariants {
  lighter: string;
  100: string;
  200: string;
  light: string;
  400: string;
  main: string;
  dark: string;
  700: string;
  darker: string;
  900: string;
  primaryText: string; // used for secondary color in dark mode
  secondaryText: string; // used for primary color in dark mode
  divider: string; // used for divider color in dark mode
  paper: string; // used for paper background color in dark mode
  default: string; // used for default background color in dark mode
  hover: string; // used for hover color(less used)
  contrastText: string;
}

// Color value interface for advanced color customization
export interface ColorValues {
  primary: ColorVariants;
  secondary: ColorVariants;
  success: ColorVariants;
  warning: ColorVariants;
  error: ColorVariants;
  info: ColorVariants;
  grey: ColorVariants;
}

// Context type
export interface ThemeContextType {
  mode: PaletteMode;
  selectedTheme: number;
  colorValues: ColorValues;
  setThemeSettings: React.Dispatch<
    React.SetStateAction<{
      mode: PaletteMode;
      selectedTheme: any;
      colorValues: ColorValues;
    }>
  >;
  toggleThemeMode: () => void;
  selectTheme: (themeIndex: number) => void;
  updateColorValue: (type: keyof ColorValues, value: string) => void;
}
