import { createSlice } from '@reduxjs/toolkit';
import { IProductSliceState } from './types';

const initialState: IProductSliceState = {
  edit: false,
  currentId: null,
  viewId: null
};

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    currentProductId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearProductData: (state) => {
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

export const { setEdit, currentProductId, clearProductData, setViewId, clearViewId } = productSlice.actions;

export default productSlice.reducer;
