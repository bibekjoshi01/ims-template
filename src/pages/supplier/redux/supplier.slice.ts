import { createSlice } from '@reduxjs/toolkit';
import { ISupplierSliceState } from './types';

const initialState: ISupplierSliceState = {
  edit: false,
  currentId: null,
  viewId: null
};

export const supplierSlice = createSlice({
  name: 'Supplier',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    setCurrentSupplierId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearSupplierData: (state) => {
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

export const { setEdit, setCurrentSupplierId, clearSupplierData, setViewId, clearViewId } = supplierSlice.actions;

export default supplierSlice.reducer;
