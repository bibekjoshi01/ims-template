// material-ui
import IconButton from '@mui/material/IconButton';

// project import
import { useFullscreen } from '@/hooks/useFullscreen';

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

// ==============================|| FULL SCREEN BUTTON ||============================== //

export default function FullScreenButton() {
  const { isFullscreen, handleFullscreenToggle } = useFullscreen();

  return (
    <>
      <IconButton
        onClick={handleFullscreenToggle}
        title="Enter full screen"
        sx={{
          bgcolor: isFullscreen ? 'action.hover' : 'transparent',
          mr: 0.2
        }}
      >
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </IconButton>
    </>
  );
}
