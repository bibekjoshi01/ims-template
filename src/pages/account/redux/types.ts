export interface UserProfile {
  id?: number;
  photo: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNo: string;
  email: string;
  dateJoined: string;
  lastLogin: string;
  isEmailVerified: boolean;
  roles: string[];
}

export interface ChangePasswordFormDataType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
