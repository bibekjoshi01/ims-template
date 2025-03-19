import { formatHex, oklch } from 'culori';

function oklchToHex(oklchString) {
  const color = oklch(oklchString);
  if (color) {
    return formatHex(color);
  }

  return '#000000';
}

let THEME_PRESETS = [
  {
    primary: {
      main: oklchToHex('oklch(59% 0.249 0.584)'),
      primaryText: oklchToHex('oklch(92% 0 0)'),
      contrastText: oklchToHex('oklch(100% 0 0)')
    },
    secondary: {
      main: oklchToHex('oklch(44% 0.177 26.899)'),
      secondaryText: oklchToHex('oklch(44% 0.177 26.899)'),
      contrastText: oklchToHex('oklch(93% 0.032 17.717)'),
      paper: oklchToHex('oklch(12% 0.042 264.695)'),
      default: oklchToHex('oklch(13% 0.028 261.692)'),
      divider: '#51515c',
      hover: '#1a273a'
    },
    success: {
      main: oklchToHex('oklch(62% 0.194 149.214)'),
      contrastText: oklchToHex('oklch(26% 0.065 152.934)')
    },
    info: {
      main: oklchToHex('oklch(71% 0.143 215.221)'),
      contrastText: oklchToHex('oklch(30% 0.056 229.695)')
    },
    error: {
      main: oklchToHex('oklch(64% 0.246 16.439)'),
      contrastText: oklchToHex('oklch(27% 0.105 12.094)')
    },
    warning: {
      main: oklchToHex('oklch(79% 0.184 86.047)'),
      contrastText: oklchToHex('oklch(28% 0.066 53.813)')
    },
    grey: {
      main: oklchToHex('oklch(24.155% 0.049 89.07)'),
      contrastText: oklchToHex('oklch(92.951% 0.002 17.197)')
    }
  }
];

const string = JSON.stringify(THEME_PRESETS, null, 2);
console.log(string);
