// MUI Imports
import { generate, presetDarkPalettes, presetPalettes } from '@ant-design/colors';
import { PaletteMode } from '@mui/material';

// Project Imports
import { ColorValues, ColorVariants } from '@/contexts/theme-context/types';
import { THEME_PRESETS } from '@/utils/constants/colors';

// Function to generate color variants
const createColorVariants = (colors: string[], mainColor: string): Partial<ColorVariants> => ({
  lighter: colors[0],
  100: colors[1],
  200: colors[2],
  light: colors[3],
  400: colors[4],
  main: mainColor, // do not change main color as it was already updated by the user
  dark: colors[6],
  700: colors[7],
  darker: colors[8],
  900: colors[9]
});

export default function Theme(mode: PaletteMode, colorValues: ColorValues): ColorValues {
  const isDarkMode = mode === 'dark';
  const colors = colorValues || THEME_PRESETS[0][mode];

  // choose which palette to use based on mode(light/dark)
  const palettes = isDarkMode ? presetDarkPalettes : presetPalettes;

  // get the main color
  const primaryColor = colors.primary?.main || palettes.blue[5];
  const secondaryColor = colors.secondary?.main || palettes.purple[5];
  const successColor = colors.success?.main || palettes.green[5];
  const warningColor = colors.warning?.main || palettes.gold[5];
  const errorColor = colors.error?.main || palettes.red[5];
  const infoColor = colors.info?.main || palettes.cyan[5];
  const greyColor = colors.grey?.main || palettes.grey[5];

  // Generate the color palette based on the main color, and retain the original colors if it has been set
  const generatedPalette = {
    primary: { ...createColorVariants(generate(primaryColor), primaryColor), ...colors?.primary },
    secondary: { ...createColorVariants(generate(secondaryColor), secondaryColor), ...colors?.secondary },
    success: { ...createColorVariants(generate(successColor), successColor), ...colors?.success },
    warning: { ...createColorVariants(generate(warningColor), warningColor), ...colors?.warning },
    error: { ...createColorVariants(generate(errorColor), errorColor), ...colors?.error },
    info: { ...createColorVariants(generate(infoColor), infoColor), ...colors?.info },
    grey: { ...createColorVariants(generate(greyColor), greyColor), ...colors?.grey }
  };

  return generatedPalette;
}
