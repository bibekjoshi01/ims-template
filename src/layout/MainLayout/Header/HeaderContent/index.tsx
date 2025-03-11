import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import { useFullscreen } from '@/hooks/useFullscreen';
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { isFullscreen, handleFullscreenToggle } = useFullscreen();

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <IconButton
        onClick={handleFullscreenToggle}
        // target="_blank"
        disableRipple
        color="secondary"
        title="Enter full screen"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </IconButton>
      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
