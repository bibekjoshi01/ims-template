export interface IPermission {
  id: number;
  name: string;
  codename: string;
}

export interface IRole {
  id: number;
  name: string;
  codename: string;
}

export interface IAuthState {
  fullName: string;
  email: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: IRole[] | [];
  isSuperuser: boolean;
  photo?: string;
  tokens?: {
    access: string;
    refresh: string;
  };
  permissions: IPermission[];
  isAuthenticated?: boolean;
  authVerificationEmailSent?: boolean;
  forgetPasswordEmailSent?: boolean;
}

export interface UnverifiedLoginState {
  message: string;
}

export interface LoginFormDataType {
  persona: string;
  password: string;
}

export interface ForgetPasswordRequestFormDataType {
  email: string;
}

export interface ResetPasswordRequestFormDataType {
  newPassword: string;
  confirmPassword: string;
  token?: string;
}
