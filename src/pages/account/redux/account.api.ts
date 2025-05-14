import { rootAPI } from '../../../libs/apiSlice';

export const accountAPI = 'admin/user-app/account';

export const accountAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => {
        const { email, password } = values;
        const transformedValues = {
          password: password,
          persona: email
        };

        return {
          url: `${accountAPI}/login`,
          method: 'POST',
          data: transformedValues
        };
      }
    }),
    logout: builder.mutation({
      query: (values) => {
        return {
          url: `${accountAPI}/logout`,
          method: 'POST',
          data: values
        };
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = accountAPISlice;
