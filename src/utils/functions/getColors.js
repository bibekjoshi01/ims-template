// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

const getColors = (theme, color) => {
  let palette;

  switch (color) {
    case 'secondary':
      palette = theme?.palette?.secondary;
      break;
    case 'error':
      palette = theme?.palette?.error;
      break;
    case 'warning':
      palette = theme?.palette?.warning;
      break;
    case 'info':
      palette = theme?.palette?.info;
      break;
    case 'success':
      palette = theme?.palette?.success;
      break;
    default:
      palette = theme?.palette?.primary;
  }

  // Ensure we always return an object with at least these properties
  return {
    lighter: palette?.lighter || '#e6f7ff',
    light: palette?.light || '#69c0ff',
    main: palette?.main || '#1890ff',
    dark: palette?.dark || '#096dd9',
    darker: palette?.darker || '#003a8c',
    contrastText: palette?.contrastText || '#ffffff'
  };
};

export default getColors;
