import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// project import
import getColors from '@/utils/functions/getColors';

export default function Dot({ color, size, variant, sx }) {
  const theme = useTheme();
  const colors = getColors(theme, color || 'primary');
  const { main } = colors;

  return (
    <Box
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && { border: `1px solid ${main}` }),
        ...sx
      }}
    />
  );
}

Dot.propTypes = { color: PropTypes.any, size: PropTypes.number, variant: PropTypes.string, sx: PropTypes.any };
