// MUI Imports
import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// project import
import { ColorValues } from '@/contexts/theme-context/types';
import { Theme } from '@mui/material/styles/createTheme';
import ThemeOption from './colors';

export default function Palette(mode: PaletteMode, colorValues: ColorValues): [Theme, ColorValues] {
  // Generate the palette colors based on the inputs
  const paletteColor = ThemeOption(mode, colorValues);

  return [
    createTheme({
      palette: {
        mode,
        common: {
          black: '#000000',
          white: '#ffffff'
        },
        ...paletteColor,
        text: {
          primary: paletteColor.primary.primaryText, // use this for main text color in website
          secondary: paletteColor.secondary.secondaryText, // use this for secondary text color in website
          disabled: paletteColor.grey[400] // use contrastText of paletteColors for texts inside some colored components like buttons
        },
        action: {
          disabled: paletteColor.grey.light,
          hover: paletteColor.secondary.hover
        },
        divider: paletteColor.secondary.divider,
        background: {
          paper: paletteColor.secondary.paper, // Background color for paper components
          default: paletteColor.secondary.default // Background color especilly for Body (default components)
        }
      },
      components: {
        // MuiButton styling
        MuiButton: {
          styleOverrides: {
            root: {
              fontWeight: 500,
              borderRadius: '4px'
            }
          }
        },
        // MuiPaper styling
        MuiPaper: {
          defaultProps: {
            elevation: 0
          },
          styleOverrides: {
            root: {
              backgroundImage: 'none'
            },
            rounded: {
              borderRadius: '8px'
            }
          }
        },
        // MuiCardHeader styling
        MuiCardHeader: {
          styleOverrides: {
            root: {
              padding: '24px'
            },
            title: {
              fontSize: '1.125rem'
            }
          }
        },
        // MuiCardContent styling
        MuiCardContent: {
          styleOverrides: {
            root: {
              padding: '24px'
            }
          }
        },
        // MuiCardActions styling
        MuiCardActions: {
          styleOverrides: {
            root: {
              padding: '24px'
            }
          }
        }
      }
    }),
    paletteColor
  ];
}
