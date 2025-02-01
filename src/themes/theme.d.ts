import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      button: string;
      text: string;
      z1: string;
    };
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
