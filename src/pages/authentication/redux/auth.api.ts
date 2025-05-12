import { rootAPI } from '../../../libs/apiSlice';

export const authAPI = 'admin/user-app/account';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => {
        const { email, password } = values;
        const transformedValues = {
          password: password,
          persona: email
        };

        return {
          url: `${authAPI}/login`,
          method: 'POST',
          data: transformedValues
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
