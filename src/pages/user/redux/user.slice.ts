import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from './types';

const initialState: UserSliceState = {
  edit: false,
  currentId: null
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
    }
  }
});

export const { setEdit, currentUserId, clearUserData } = userSlice.actions;

export default userSlice.reducer;
