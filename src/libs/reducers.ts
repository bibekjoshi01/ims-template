import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

// Project Imports
import authReducer from '@/pages/authentication/redux/auth.slice';
import blogReducer from '@/pages/blog/redux/blog.slice';
import commonReducer from '@/pages/common/redux/common.slice';
import userReducer from '@/pages/user/redux/user.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  user: userReducer,
  common: commonReducer,
  // add reducers here
  [rootAPI.reducerPath]: rootAPI.reducer
});
