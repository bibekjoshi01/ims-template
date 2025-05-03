import { ColorValues, ColorVariants } from '@/contexts/theme-context/types';

const mantisColorObj = {
  name: 'Mantis',
  light: {
    primary: {
      main: '#1890ff',
      primaryText: '#1f1f1f',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#8c8c8c',
      secondaryText: '#8c8c8c',
      contrastText: '#ffffff',
      paper: '#ffffff',
      default: '#fafafb',
      divider: '#e4e4e7',
      hover: '#0000000a'
    },
    success: {
      main: '#52c41a',
      contrastText: '#000000'
    },
    info: {
      main: '#00b5ff',
      contrastText: '#000000'
    },
    error: {
      main: '#f5222d',
      contrastText: '#000000'
    },
    warning: {
      main: '#faad14',
      contrastText: '#000000'
    },
    grey: {
      main: '#8c8c8c',
      contrastText: '#e9e7e7'
    }
  },
  dark: {
    primary: {
      main: '#1890ff',
      primaryText: '#ffffff',
      contrastText: '#f4f4f4'
    },
    secondary: {
      main: '#8c8c8c',
      secondaryText: '#ffffff73',
      contrastText: '#ffffff73',
      paper: '#1e1e1e',
      default: '#030712',
      divider: '#51515c',
      hover: '#1a273a'
    },
    success: {
      main: '#52c41a',
      contrastText: '#022d14'
    },
    info: {
      main: '#00b6d9',
      contrastText: '#053344'
    },
    error: {
      main: '#f5222d',
      contrastText: '#4d0218'
    },
    warning: {
      main: '#faad14',
      contrastText: '#411e03'
    },
    grey: {
      main: '#8c8c8c',
      contrastText: '#e9e7e7'
    }
  }
};

const defaultColor: ColorVariants = {
  lighter: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  light: '#64b5f6',
  400: '#42a5f5',
  main: '#2196f3',
  dark: '#1e88e5',
  700: '#1976d2',
  darker: '#1565c0',
  900: '#0d47a1',
  secondaryText: '#ffffde',
  primaryText: '#bfbfbf',
  divider: '#404040',
  paper: '#1e1e1e',
  default: '#141414',
  hover: '#0000000a',
  contrastText: '#000000'
};

interface ITHEME_PRESETS {
  name: string;
  light: ColorValues;
  dark: ColorValues;
}

let THEME_PRESETS = [
  mantisColorObj,
  {
    name: 'Harmony',
    light: {
      primary: {
        main: '#fe0075',
        primaryText: '#100f0f',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#979fad',
        secondaryText: '#262629',
        contrastText: '#f2f0fc',
        paper: '#f8f8f8',
        default: '#f2f2f2',
        divider: '#e4e4e7',
        hover: '#e4e4e4'
      },
      success: {
        main: '#00a96e',
        contrastText: '#000000'
      },
      info: {
        main: '#00b5ff',
        contrastText: '#000000'
      },
      error: {
        main: '#ff5861',
        contrastText: '#000000'
      },
      warning: {
        main: '#ffbe00',
        contrastText: '#000000'
      },
      grey: {
        main: '#291e00',
        contrastText: '#e9e7e7'
      }
    },
    dark: {
      primary: {
        main: '#e50076',
        primaryText: '#e4e4e4',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#6a7282',
        secondaryText: '#f7f9fa',
        contrastText: '#f7f9fa',
        paper: '#010515',
        default: '#030712',
        divider: '#51515c',
        hover: '#1a273a'
      },
      success: {
        main: '#00a43b',
        contrastText: '#022d14'
      },
      info: {
        main: '#00b6d9',
        contrastText: '#053344'
      },
      error: {
        main: '#fe1c55',
        contrastText: '#4d0218'
      },
      warning: {
        main: '#eeaf00',
        contrastText: '#411e03'
      },
      grey: {
        main: '#291e00',
        contrastText: '#e9e7e7'
      }
    }
  },
  {
    name: 'Garden',
    light: {
      primary: {
        main: '#00d3bb',
        primaryText: '#18181b',
        contrastText: '#002d2c'
      },
      secondary: {
        main: '#99e600',
        secondaryText: '#182d02',
        contrastText: '#182d02',
        paper: '#f8f8f8',
        default: '#f2f2f2',
        divider: '#e4e4e7',
        hover: '#e4e4e4'
      },
      success: {
        main: '#5ca300',
        contrastText: '#f5fce5'
      },
      info: {
        main: '#0082ce',
        contrastText: '#edf7fd'
      },
      error: {
        main: '#e50076',
        contrastText: '#fcf2f8'
      },
      warning: {
        main: '#f34700',
        contrastText: '#fff7ed'
      },
      grey: {
        main: '#51515c',
        contrastText: '#f8f8f8'
      }
    },
    dark: {
      primary: {
        main: '#00baa6',
        primaryText: '#d4d4d8',
        contrastText: '#084d49'
      },
      secondary: {
        main: '#7acc00',
        secondaryText: '#7acc00',
        contrastText: '#33520c',
        paper: '#161616',
        default: '#090909',
        divider: '#51515c',
        hover: '#1a273a'
      },
      success: {
        main: '#487d00',
        contrastText: '#eafac8'
      },
      info: {
        main: '#0069a8',
        contrastText: '#dff2fe'
      },
      error: {
        main: '#c5005a',
        contrastText: '#f9e4f0'
      },
      warning: {
        main: '#c93400',
        contrastText: '#feecd3'
      },
      grey: {
        main: '#51515c',
        contrastText: '#f8f8f8'
      }
    }
  },
  {
    name: 'Daisy',
    light: {
      primary: {
        main: '#422ad5',
        primaryText: '#18181b',
        contrastText: '#e0e7ff'
      },
      secondary: {
        main: '#009689',
        secondaryText: '#00776f',
        contrastText: '#f7f9fa',
        paper: '#ffffff',
        default: '#f8f8f8',
        divider: '#e4e4e7',
        hover: '#e4e4e4'
      },
      success: {
        main: '#00d390',
        contrastText: '#004c39'
      },
      info: {
        main: '#00bafe',
        contrastText: '#042e49'
      },
      error: {
        main: '#ff627d',
        contrastText: '#4d0218'
      },
      warning: {
        main: '#fcb700',
        contrastText: '#793205'
      },
      grey: {
        main: '#09090b',
        contrastText: '#e4e4e7'
      }
    },
    dark: {
      primary: {
        main: '#605dff',
        primaryText: '#ecf9ff',
        contrastText: '#edf1fe'
      },
      secondary: {
        main: '#005d58',
        secondaryText: '#00d3bb',
        contrastText: '#00776f',
        paper: '#010e20',
        default: '#010024',
        divider: '#51515c',
        hover: '#1a273a'
      },
      success: {
        main: '#00d390',
        contrastText: '#004c39'
      },
      info: {
        main: '#00bafe',
        contrastText: '#042e49'
      },
      error: {
        main: '#ff627d',
        contrastText: '#4d0218'
      },
      warning: {
        main: '#fcb700',
        contrastText: '#793205'
      },
      grey: {
        main: '#09090b',
        contrastText: '#e4e4e7'
      }
    }
  }
];

THEME_PRESETS = THEME_PRESETS.map((preset) => ({
  name: preset.name,
  light: {
    primary: { ...defaultColor, ...preset.light.primary },
    secondary: { ...defaultColor, ...preset.light.secondary },
    success: { ...defaultColor, ...preset.light.success },
    info: { ...defaultColor, ...preset.light.info },
    error: { ...defaultColor, ...preset.light.error },
    warning: { ...defaultColor, ...preset.light.warning },
    grey: { ...defaultColor, ...preset.light.grey }
  },
  dark: {
    primary: { ...defaultColor, ...preset.dark.primary },
    secondary: { ...defaultColor, ...preset.dark.secondary },
    success: { ...defaultColor, ...preset.dark.success },
    info: { ...defaultColor, ...preset.dark.info },
    error: { ...defaultColor, ...preset.dark.error },
    warning: { ...defaultColor, ...preset.dark.warning },
    grey: { ...defaultColor, ...preset.dark.grey }
  }
})) as ITHEME_PRESETS[];

export { THEME_PRESETS };

// Simple color schemes for primary color
export const COLOR_SCHEMES = [
  { name: 'Default', light: { main: '#2196f3' }, dark: { main: '#90caf9' } },
  { name: 'Purple', light: { main: '#7352C7' }, dark: { main: '#9575cd' } },
  { name: 'Green', light: { main: '#4CAF50' }, dark: { main: '#81c784' } },
  { name: 'Orange', light: { main: '#FF9800' }, dark: { main: '#ffb74d' } },
  { name: 'Pink', light: { main: '#E91E63' }, dark: { main: '#f48fb1' } },
  { name: 'Cyan', light: { main: '#00BCD4' }, dark: { main: '#4dd0e1' } },
  { name: 'Violet', light: { main: '#9C27B0' }, dark: { main: '#ba68c8' } },
  { name: 'Amber', light: { main: '#FF5722' }, dark: { main: '#ff8a65' } },
  { name: 'Grey', light: { main: '#607D8B' }, dark: { main: '#90a4ae' } }
];

export const defaultPaginationDetail = {
  page: 0,
  pageSize: 10
};
