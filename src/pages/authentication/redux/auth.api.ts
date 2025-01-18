import { rootAPI } from '../../../libs/apiSlice';

export const authAPI = 'admin/user-app/users';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => {
        return {
          url: `${authAPI}/login`,
          method: 'POST',
          data: values
        };
      }
    }),
    logout: builder.mutation({
      query: (values) => {
        return {
          url: `${authAPI}/logout`,
          method: 'POST',
          data: values
        };
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authAPISlice;
