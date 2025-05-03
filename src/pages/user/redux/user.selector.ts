import { RootState } from '@/libs/store';

export const userState = (state: RootState) => {
  return state?.user;
};
