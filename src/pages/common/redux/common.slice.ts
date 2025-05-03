import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: []
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // store permissions constant for specific models
    setPermissions: (state, { payload }) => {
      state.permissions = payload;
    }
  }
});

export const { setPermissions } = commonSlice.actions;

export default commonSlice.reducer;
