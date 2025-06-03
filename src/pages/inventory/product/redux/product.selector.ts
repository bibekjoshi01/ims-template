import { RootState } from '@/libs/store';

export const productState = (state: RootState) => {
  return state?.product;
};
