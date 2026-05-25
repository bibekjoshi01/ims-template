// material-ui
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// project import
import getColors from '@/utils/functions/getColors';

type DotVariant = 'outlined' | 'filled';

interface DotProps {
  color?: string;
  size?: number;
  variant?: DotVariant;
  sx?: SxProps<Theme>;
}

export default function Dot({ color, size, variant, sx }: DotProps) {
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
