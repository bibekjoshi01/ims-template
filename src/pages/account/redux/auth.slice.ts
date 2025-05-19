import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { UserProfile } from './types';

const initialState: UserProfile = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  fullName: '',
  phoneNo: '',
  email: '',
  dateJoined: '',
  lastLogin: '',
  isEmailVerified: false,
  roles: [],
  photo: ''
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    profileSuccess: (state, action: PayloadAction<UserProfile>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { profileSuccess } = accountSlice.actions;

export default accountSlice.reducer;
