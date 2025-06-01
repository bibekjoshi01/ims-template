import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './types';

const initialState: IInitialState = {
  permissions: [],
  message: '',
  variant: 'error' // Default variant
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // Store permissions constant for specific models
    setPermissions: (state, { payload }) => {
      state.permissions = payload;
    },

    // Set a message with variant (success, warning, error, etc.)
    setMessage: (state, { payload }) => {
      state.message = payload.message;
      state.variant = payload.variant;
    },

    // Clear the message and variant
    clearMessage: (state) => {
      state.message = '';
      state.variant = 'error';
    }
  }
});

export const { setPermissions, setMessage, clearMessage } = commonSlice.actions;

export default commonSlice.reducer;
