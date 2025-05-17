import { RootState } from '@/libs/store';

export const accountState = (state: RootState) => {
  return state?.account;
};
