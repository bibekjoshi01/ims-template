import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      button: string;
      text: string;
      z1: string;
    };
  }

  interface PaletteColor {
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
    primaryText: string;
    secondaryText: string;
    divider: string;
    paper: string;
    default: string;
    hover: string;
  }

  interface ThemeOptions {
    customShadows?: {
      button: string;
      text: string;
      z1: string;
    };
  }
}

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}
