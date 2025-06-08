import { createSlice } from '@reduxjs/toolkit';
import { ICustomerSliceState } from './types';

const initialState: ICustomerSliceState = {
  edit: false,
  currentId: null,
  viewId: null
};

export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
    setCurrentCustomerId: (state, { payload }) => {
      state.currentId = payload;
    },
    clearCustomerData: (state) => {
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

export const { setEdit, setCurrentCustomerId, clearCustomerData, setViewId, clearViewId } = customerSlice.actions;

export default customerSlice.reducer;
