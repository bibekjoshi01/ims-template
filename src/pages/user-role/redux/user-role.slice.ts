import { createSlice } from '@reduxjs/toolkit';
import { UserRoleSliceState } from './types';

const initialState: UserRoleSliceState = {
  edit: false,
  currentId: undefined
};

export const userRoleSlice = createSlice({
  name: 'User Role',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    currentUserRoleId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearUserRoleData: (state) => {
      state.edit = false;
      state.currentId = undefined;
    }
  }
});

export const { setEdit, currentUserRoleId, clearUserRoleData } = userRoleSlice.actions;

export default userRoleSlice.reducer;
