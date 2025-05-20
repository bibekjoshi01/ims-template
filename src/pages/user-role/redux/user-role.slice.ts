import { createSlice } from '@reduxjs/toolkit';
import { UserRoleSliceState } from './types';

const initialState: UserRoleSliceState = {
  edit: false,
  currentId: null,
  viewId: null
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
      state.currentId = null;
    },
    setViewId: (state, { payload }) => {
      state.viewId = payload;
    },
    clearViewId: (state) => {
      state.viewId = null;
    }
  }
});

export const { setEdit, currentUserRoleId, clearUserRoleData, setViewId, clearViewId } = userRoleSlice.actions;

export default userRoleSlice.reducer;
