import { rootAPI } from '../../../libs/apiSlice';
import { UserProfile } from './types';

export const accountAPI = 'admin/user-app/account';

export const accountAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => {
        return {
          url: `${accountAPI}/profile`,
          method: 'GET'
        };
      }
    })
  })
});

export const { useGetProfileQuery } = accountAPISlice;
