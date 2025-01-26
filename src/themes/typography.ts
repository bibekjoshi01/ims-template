// ==============================|| DEFAULT THEME - TYPOGRAPHY ||============================== //

interface Heading {
  fontWeight?: number;
  fontSize: string;
  lineHeight: number;
}

interface TextStyle {
  fontSize: string;
  lineHeight: number;
  fontWeight?: number;
}

interface ButtonStyle {
  textTransform: string;
}

export interface TypographyReturn {
  htmlFontSize: number;
  fontFamily: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: Heading;
  h2: Heading;
  h3: Heading;
  h4: Heading;
  h5: Heading;
  h6: Heading;
  caption: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  overline: Partial<TextStyle>;
  button: ButtonStyle;
}

export default function Typography(fontFamily: string): TypographyReturn {
  return {
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    overline: {
      lineHeight: 1.66
    },
    button: {
      textTransform: 'capitalize'
    }
  };
}
