// material-ui
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { styled, useTheme } from '@mui/material/styles';

// project import
import getColors from '@/utils/functions/getColors';

interface colorStyleProps {
  theme: any;
  color: string;
  type: string;
  size?: string;
}

function getColorStyle({ theme, color, type }: colorStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, light, main, contrastText } = colors;

  switch (type) {
    case 'filled':
      return {
        color: contrastText,
        background: main
      };
    case 'outlined':
      return {
        color: main,
        border: '1px solid',
        borderColor: main,
        background: 'transparent'
      };
    case 'combined':
      return {
        color: main,
        border: '1px solid',
        borderColor: light,
        background: lighter
      };
    default:
      return {
        color: main,
        background: lighter
      };
  }
}

// ==============================|| AVATAR - SIZE STYLE ||============================== //

interface AvatarProps extends MuiAvatarProps {
  children?: React.ReactNode;
  color?: string;
  type?: string;
  size?: 'sm' | 'md' | 'lg' | 'badge' | string;
}

function getSizeStyle(size: string) {
  switch (size) {
    case 'badge':
      return {
        border: '2px solid',
        fontSize: '0.675rem',
        width: 20,
        height: 20
      };
    case 'xs':
      return {
        fontSize: '0.75rem',
        width: 24,
        height: 24
      };
    case 'sm':
      return {
        fontSize: '0.875rem',
        width: 32,
        height: 32
      };
    case 'lg':
      return {
        fontSize: '1.2rem',
        width: 52,
        height: 52
      };
    case 'xl':
      return {
        fontSize: '1.5rem',
        width: 64,
        height: 64
      };
    case 'md':
    default:
      return {
        fontSize: '1rem',
        width: 40,
        height: 40
      };
  }
}

const AvatarStyle = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'type' && prop !== 'size'
})<AvatarProps>(({ theme, color, type, size }: any) => ({
  ...getSizeStyle(size),
  ...getColorStyle({ theme, color, type }),
  ...(size === 'badge' && {
    borderColor: theme.palette.background.default
  })
}));

export default function Avatar({ children, color = 'primary', type = 'filled', size = 'md', ...others }: AvatarProps) {
  const theme = useTheme();

  return (
    <AvatarStyle theme={theme} color={color} type={type} size={size} {...others}>
      {children}
    </AvatarStyle>
  );
}
