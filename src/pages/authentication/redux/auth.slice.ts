import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LoginState } from './types';

const initialState: LoginState = {
  fullName: '',
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
        payload: { fullName, email, photo, phoneNo, tokens, isEmailVerified, isPhoneVerified, isSuperuser, groups, userPermissions }
      } = action;

      state.fullName = fullName;
      state.email = email;
      state.photo = photo;
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
    },
    logoutSuccess: (state) => {
      Cookies.remove('access', { path: '/' });
      Cookies.remove('refresh', { path: '/' });
      Cookies.set('logout', 'true');
      // Reset the state to initialState
      Object.assign(state, initialState);
    }
  }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
