import type { Ref } from 'react';
import { forwardRef } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';

type TransitionPosition = 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
type TransitionType = 'grow' | 'collapse' | 'fade' | 'slide' | 'zoom';
type SlideDirection = 'up' | 'right' | 'left' | 'down';

interface TransitionProps {
  children?: React.ReactElement;
  position?: TransitionPosition;
  type?: TransitionType;
  direction?: SlideDirection;
  [key: string]: unknown;
}

function transitions(
  { children, position = 'top-left', type = 'grow', direction = 'up', ...others }: TransitionProps,
  ref: Ref<HTMLDivElement>
) {
  let positionSX;

  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right'
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top'
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left'
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right'
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom'
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0'
      };
      break;
  }

  return (
    <Box ref={ref}>
      {type === 'grow' && (
        <Grow
          {...others}
          timeout={{
            appear: 0,
            enter: 150,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}

      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}

      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}

      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 150,
            exit: 150
          }}
          direction={direction}
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}

      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
}

export default forwardRef(transitions);

function popupTransition(props: TransitionProps, ref: Ref<unknown>) {
  const { children, ...transitionProps } = props;
  const popupChildren = children ?? <></>;

  return (
    <Zoom ref={ref} timeout={200} {...transitionProps}>
      {popupChildren}
    </Zoom>
  );
}
export const PopupTransition = forwardRef(popupTransition);
