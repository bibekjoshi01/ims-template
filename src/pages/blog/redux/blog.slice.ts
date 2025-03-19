import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  edit: false,
  currentId: null
};

export const blogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {}
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
