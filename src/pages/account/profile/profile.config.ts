import { FormField } from '@/components/app-form/types';
import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import * as z from 'zod';
import { UserProfile } from '../redux/types';

export const updateProfileSchema = z.object({
  photo: z.union([z.instanceof(File), z.string().nullable()]).optional(),
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  phoneNo: z.string().min(10, 'Phone number is required')
});

export type UpdateProfileFormDataType = z.infer<typeof updateProfileSchema>;

export const defaultValues: UpdateProfileFormDataType = {
  firstName: '',
  lastName: '',
  phoneNo: '',
  photo: ''
};

export const personalInfoFields: FormField<UpdateProfileFormDataType>[] = [
  { name: 'firstName', label: 'First Name', xs: 12, sm: 6, type: 'text' },
  { name: 'lastName', label: 'Last Name', xs: 12, sm: 6, type: 'text' },
  { name: 'phoneNo', label: 'Phone Number', xs: 12, sm: 6, type: 'text' }
];

const excludeFields: (keyof UserProfile)[] = ['id', 'photo', 'firstName', 'lastName', 'roles'];
const fieldOrder: (keyof UserProfile)[] = [
  'fullName',
  'username',
  'email',
  'phoneNo',
  'lastLogin',
  'dateJoined',
  'isEmailVerified',
  'roles'
];
const dateTimeFields: (keyof UserProfile)[] = ['lastLogin', 'dateJoined'];
const booleanFields: (keyof UserProfile)[] = ['isEmailVerified'];

export const viewProfileConfig: Omit<DynamicInfoSectionProps<UserProfile>, 'data'> = {
  excludeFields,
  fieldOrder,
  dateTimeFields,
  booleanFields,
  customLabels: {
    fullName: 'Full Name',
    username: 'Username',
    email: 'Email Address',
    phoneNo: 'Phone Number',
    lastLogin: 'Last Login',
    dateJoined: 'Date Joined',
    isEmailVerified: 'Email Verified',
    roles: 'Roles'
  },
  columns: 2
};
