// material-ui
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

import FullScreenButton from './FullScreen';
import ThemeSettings from './ThemeSettings';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <FullScreenButton />
      <Notification />
      <ThemeSettings />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
