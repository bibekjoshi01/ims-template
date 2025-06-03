import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import Breadcrumbs from '@/components/@extended/Breadcrumbs';
import Loader from '@/components/Loader';
import navigation from '@/menu-items';
import Drawer from './Drawer';
import Header from './Header';

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { MenuSearchProvider } from '@/contexts/search-context';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme: any) => theme.breakpoints.down('xl'));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <MenuSearchProvider>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header />
        <Drawer />
        <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Toolbar />
          <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Breadcrumbs navigation={navigation} title />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </MenuSearchProvider>
  );
}
