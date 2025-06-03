import { createSlice } from '@reduxjs/toolkit';
import { ICategorySliceState } from './types';

const initialState: ICategorySliceState = {
  edit: false,
  currentId: null,
  viewId: null
};

export const productCategorySlice = createSlice({
  name: 'ProductCategory',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    currentCategoryId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearCategoryData: (state) => {
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

export const { setEdit, currentCategoryId, clearCategoryData, setViewId, clearViewId } = productCategorySlice.actions;

export default productCategorySlice.reducer;
