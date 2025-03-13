import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

// Project Imports
import authReducer from '@/pages/authentication/redux/auth.slice';
import blogReducer from '@/pages/blog/redux/blog.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  // add reducers here
  [rootAPI.reducerPath]: rootAPI.reducer
});
