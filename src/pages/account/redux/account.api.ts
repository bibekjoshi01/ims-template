import { rootAPI } from '../../../libs/apiSlice';
import { ChangePasswordFormDataType, UserProfile } from './types';

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
    }),

    changePassword: builder.mutation({
      query: ({ values }: { values: ChangePasswordFormDataType }) => {
        const { currentPassword, ...rest } = values;
        const updatedValues = {
          oldPassword: currentPassword,
          ...rest
        };

        return {
          url: `${accountAPI}/change-password`,
          method: 'POST',
          data: updatedValues
        };
      }
    })
  })
});

export const { useGetProfileQuery, useChangePasswordMutation } = accountAPISlice;
