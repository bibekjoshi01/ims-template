export interface permission {
  id: number;
  name: string;
  codename: string;
}

export interface group {
  codename: string;
  id: number;
  isActive: boolean;
  isArchived: boolean;
  isSystemManaged: boolean;
  name: string;
  permissions: permission[] | [];
  photo?: string;
}

export interface LoginState {
  fullName: string;
  email: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  groups: group[] | [];
  isSuperuser: boolean;
  photo?: string;
  tokens?: {
    access: string;
    refresh: string;
  };
  userPermissions: permission[];
}

export interface AuthState {
  fullName: string;
  email: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  groups: group[] | [];
  isSuperuser: boolean;
  photo?: string;
  tokens?: {
    access: string;
    refresh: string;
  };
  userPermissions: permission[];
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
