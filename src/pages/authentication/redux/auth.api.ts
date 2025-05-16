import { rootAPI } from '../../../libs/apiSlice';
import { LoginFormDataType } from './types';

export const authAPI = 'admin/user-app/auth';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { values: LoginFormDataType }>({
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
    }),
    verify: builder.mutation({
      query: (values) => {
        return {
          url: `${authAPI}/verify`,
          method: 'POST',
          data: values
        };
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useVerifyMutation } = authAPISlice;
