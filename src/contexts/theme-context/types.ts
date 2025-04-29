import { PaletteMode } from '@mui/material';

export interface ColorVariants {
  // these colors can be used as (keyof ColorValues).name example primary.main
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
  contrastText: string; // used for texts inside some colored boxes

  primaryText: string; // used for main text color can be used as text.primary
  secondaryText: string; // used for secondary text color can be used as text.secondary
  divider: string; // used for divider color can be used as secondary.divider
  paper: string; // used for paper background color can be used as secondary.paper
  default: string; // used for default background color can be used as secondary.default
  hover: string; // used for hover color can be used as can be used as secondary.hover
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
