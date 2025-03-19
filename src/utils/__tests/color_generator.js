function generateThemeObjectFromDaisyUI(themeString, themeName) {
  const themeData = {};
  const lines = themeString.split('\n').map((line) => line.trim());

  // parse
  lines.forEach((line) => {
    if (line.startsWith('--')) {
      const [key, value] = line.split(':').map((part) => part.trim());
      themeData[key] = value.replace(/;$/, '');
    }
  });

  // extract
  const mapColors = () => ({
    primary: {
      main: themeData['--color-primary'],
      primaryText: themeData['--color-base-content'],
      contrastText: themeData['--color-primary-content']
    },
    secondary: {
      main: themeData['--color-secondary'],
      secondaryText: themeData['--color-secondary'],
      contrastText: themeData['--color-secondary-content'],
      paper: themeData['--color-base-100'],
      default: themeData['--color-base-200'],
      divider: '#51515c',
      hover: '#1a273a'
    },
    success: {
      main: themeData['--color-success'],
      contrastText: themeData['--color-success-content']
    },
    info: {
      main: themeData['--color-info'],
      contrastText: themeData['--color-info-content']
    },
    error: {
      main: themeData['--color-error'],
      contrastText: themeData['--color-error-content']
    },
    warning: {
      main: themeData['--color-warning'],
      contrastText: themeData['--color-warning-content']
    },
    grey: {
      main: themeData['--color-neutral'],
      contrastText: themeData['--color-neutral-content']
    }
  });

  let theme = mapColors();

  // prefix
  for (const key in theme) {
    for (const colorKey in theme[key]) {
      if (typeof theme[key][colorKey] === 'string' && theme[key][colorKey].startsWith('oklch')) {
        theme[key][colorKey] = 'oklchToHex(' + theme[key][colorKey] + ')';
      }
    }
  }

  return theme;
}

const themeString = `
  --color-base-100: oklch(12% 0.042 264.695);
  --color-base-200: oklch(13% 0.028 261.692);
  --color-base-300: oklch(55% 0.016 285.938);
  --color-base-content: oklch(92% 0 0);
  --color-primary: oklch(59% 0.249 0.584);
  --color-primary-content: oklch(100% 0 0);
  --color-secondary: oklch(44% 0.177 26.899);
  --color-secondary-content: oklch(93% 0.032 17.717);
  --color-accent: oklch(56.273% 0.054 154.39);
  --color-accent-content: oklch(100% 0 0);
  --color-neutral: oklch(24.155% 0.049 89.07);
  --color-neutral-content: oklch(92.951% 0.002 17.197);
  --color-info: oklch(71% 0.143 215.221);
  --color-info-content: oklch(30% 0.056 229.695);
  --color-success: oklch(62% 0.194 149.214);
  --color-success-content: oklch(26% 0.065 152.934);
  --color-warning: oklch(79% 0.184 86.047);
  --color-warning-content: oklch(28% 0.066 53.813);
  --color-error: oklch(64% 0.246 16.439);
  --color-error-content: oklch(27% 0.105 12.094);
  --radius-selector: 1rem;
  --radius-field: 0.5rem;
  --radius-box: 1rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 0;
  --noise: 0;
`;

const generatedTheme = generateThemeObjectFromDaisyUI(themeString, 'MyTheme');
console.log(generatedTheme);
