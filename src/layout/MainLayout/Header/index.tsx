import { useMemo } from 'react';

// material-ui
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';

// assets
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuMaster } = useGetMenuMaster();
  // @ts-ignore
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  // common header
  const mainHeader = (
    <Toolbar>
      <IconButton
        aria-label="open drawer"
        onClick={() => handlerDrawerOpen(!drawerOpen)}
        edge="start"
        sx={{
          bgcolor: drawerOpen ? 'transparent' : 'action.hover',
          ml: { xs: 0, lg: -2 }
        }}
      >
        {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    component: 'header',
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled {...appBar} open={!!drawerOpen}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
}
