import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LoginState } from './types';

const initialState: LoginState = {
  email: '',
  phoneNo: '',
  isEmailVerified: false,
  isPhoneVerified: false,
  groups: [],
  photo: '',
  userPermissions: [],
  isSuperuser: false,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginState>) => {
      const {
        payload: { email, phoneNo, tokens, isEmailVerified, isPhoneVerified, isSuperuser, groups, userPermissions }
      } = action;

      state.email = email;
      state.phoneNo = phoneNo;
      state.isEmailVerified = isEmailVerified;
      state.isPhoneVerified = isPhoneVerified;
      state.isSuperuser = isSuperuser;
      state.groups = groups;
      state.userPermissions = userPermissions;
      state.isAuthenticated = true;
      // Save access and refresh tokens in the cookies
      Cookies.set('access', tokens?.access as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax'
      });
      Cookies.set('refresh', tokens?.refresh as string, {
        path: '/',
        secure: true,
        sameSite: 'Lax'
      });
      Cookies.set('logout', 'false');
    }
  }
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
