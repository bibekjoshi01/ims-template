export interface permission {
  name: string;
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
