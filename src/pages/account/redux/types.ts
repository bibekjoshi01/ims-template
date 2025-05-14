export interface UserProfile {
  id: number;
  photo: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNo: string;
  email: string;
  isSuperuser: boolean;
  dateJoined: string;
  lastLogin: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
}
