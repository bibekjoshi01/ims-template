import { RootState } from '@/libs/store';

export const customerState = (state: RootState) => {
  return state?.customer;
};
