// material-ui
import Drawer from '@mui/material/Drawer';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';

// project import
import { drawerWidth } from '@/config';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  borderRight: '1px solid',
  borderRightColor: theme.palette.divider,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),

  overflowX: 'hidden',
  boxShadow: 'none'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(7.5)
  },
  borderRight: '1px solid',
  borderRightColor: theme.palette.divider,
  boxShadow: 'none'
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

interface MiniDrawerStyledProps {
  open: boolean;
}

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<MiniDrawerStyledProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default MiniDrawerStyled;
