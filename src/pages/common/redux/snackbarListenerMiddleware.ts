import { Middleware } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { setMessage } from '@/pages/common/redux/common.slice';
import { enqueueSnackbar } from 'notistack';

// Custom listener middleware to listen to state changes
export interface SnackbarPayload {
  message: string;
  variant: 'default' | 'error' | 'success' | 'warning' | 'info';
}

export const snackbarListenerMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  // Check if the action is a PayloadAction with the expected type
  if (typeof action === 'object' && action !== null && 'type' in action && 'payload' in action) {
    const typedAction = action as PayloadAction<SnackbarPayload>;

    if (typedAction.type === setMessage.type) {
      const { message, variant } = typedAction.payload;

      // Automatically show the snackbar when the message changes
      enqueueSnackbar(message, { variant });
    }
  }

  return next(action);
};
