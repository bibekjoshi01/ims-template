import { rootAPI } from '../../../libs/apiSlice';
import { ForgetPasswordRequestFormDataType, IAuthState, LoginFormDataType, ResetPasswordRequestFormDataType } from './types';

export const authAPI = 'admin/user-app/auth';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthState, { values: LoginFormDataType }>({
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
    }),
    forgetPasswordRequest: builder.mutation<any, { values: ForgetPasswordRequestFormDataType }>({
      query: ({ values }) => {
        return {
          url: `${authAPI}/forget-password-request`,
          method: 'POST',
          data: values
        };
      }
    }),
    resetPassword: builder.mutation<any, { values: ResetPasswordRequestFormDataType }>({
      query: ({ values }) => {
        return {
          url: `${authAPI}/forget-password`,
          method: 'POST',
          data: values
        };
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useVerifyMutation, useForgetPasswordRequestMutation, useResetPasswordMutation } =
  authAPISlice;
