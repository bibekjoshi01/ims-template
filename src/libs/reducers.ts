import { combineReducers } from '@reduxjs/toolkit';
import { rootAPI } from './apiSlice';

export const rootReducer = combineReducers({
  // add reducers here
  [rootAPI.reducerPath]: rootAPI.reducer
});
