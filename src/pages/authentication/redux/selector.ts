import { RootState } from '@/libs/store';

export const authState = (state: RootState) => {
  return state?.auth;
};
