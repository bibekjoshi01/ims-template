import { Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { forwardRef, ReactNode } from 'react';

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: string | ReactNode;
  modal?: boolean;
  [key: string]: any; // To allow additional props
}

const headerSX: SxProps<Theme> = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle = true,
      elevation,
      secondary,
      shadow,
      divider = false,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? (boxShadow ?? true) : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          // @ts-ignore
          borderColor: theme.palette.divider,
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
        )}
        {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}
        {/* card divider */}
        {divider && <Divider />}
        {/* card content */}
        {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
      </Card>
    );
  }
);

export default MainCard;
