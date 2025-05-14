import { FormField } from '@/components/FormSection';
import * as z from 'zod';

export const userProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  photo: z.any().optional(),
  phoneNo: z.string().min(1, 'Phone number is required')
});

export type UserProfileFormDataType = z.infer<typeof userProfileSchema>;

export const personalInfoFields: FormField<any>[] = [
  { name: 'firstName', label: 'First Name', xs: 12, sm: 6, type: 'text' },
  { name: 'lastName', label: 'Last Name', xs: 12, sm: 6, type: 'text' },
  { name: 'email', label: 'Email', xs: 12, sm: 6, type: 'text', disabled: true },
  { name: 'phoneNo', label: 'Phone Number', xs: 12, sm: 6, type: 'text' },
  { name: 'isEmailVerified', label: 'Email Verified', xs: 12, sm: 6, type: 'checkbox', disabled: true },
  { name: 'isPhoneVerified', label: 'Phone Number Verified', xs: 12, sm: 6, type: 'checkbox', disabled: true },
  { name: 'dateJoined', label: 'Joined Date', xs: 12, sm: 6, type: 'text', disabled: true },
  { name: 'lastLogin', label: 'Last Login', xs: 12, sm: 6, type: 'text', disabled: true },
  { name: 'roles', label: 'Roles', type: 'select', xs: 12, options: [], multipleChips: true }
];
