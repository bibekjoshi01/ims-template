import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

// Project Imports
import accountReducer from '@/pages/account/redux/auth.slice';
import authReducer from '@/pages/authentication/redux/auth.slice';
import blogReducer from '@/pages/blog/redux/blog.slice';
import commonReducer from '@/pages/common/redux/common.slice';
import userRoleReducer from '@/pages/user-role/redux/user-role.slice';
import userReducer from '@/pages/user/redux/user.slice';

export const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  account: accountReducer,
  blog: blogReducer,
  user: userReducer,
  userRole: userRoleReducer,
  // add reducers here
  [rootAPI.reducerPath]: rootAPI.reducer
});
