import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
  edit: false,
  currentId: null,
  viewId: null
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    currentUserId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearUserData: (state) => {
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

export const { setEdit, currentUserId, clearUserData, setViewId, clearViewId } = userSlice.actions;

export default userSlice.reducer;
