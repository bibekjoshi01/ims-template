import { useCallback, useState } from 'react';

// Custom hook to handle fullscreen toggle
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        // Safari
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  return { isFullscreen, handleFullscreenToggle };
}
