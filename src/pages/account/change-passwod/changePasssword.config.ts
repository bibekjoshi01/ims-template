import * as z from 'zod';

import { FormField } from '@/components/app-form/types';
import { ChangePasswordFormDataType } from '../redux/types';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!#@$%^&*)(+=._-]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(6, 'Confirm password must match new password')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const defaultValues: ChangePasswordFormDataType = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export const passwordFields: FormField<ChangePasswordFormDataType>[] = [
  { name: 'currentPassword', label: 'Current Password', xs: 12, type: 'password' },
  { name: 'newPassword', label: 'New Password', xs: 12, type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', xs: 12, type: 'password' }
];

export const ReqObj = [
  { text: 'At least 8 characters', test: (pw: string) => pw.length >= 8 },
  { text: 'At least 1 lowercase letter (a-z)', test: (pw: string) => /[a-z]/.test(pw) },
  { text: 'At least 1 uppercase letter (A-Z)', test: (pw: string) => /[A-Z]/.test(pw) },
  { text: 'At least 1 number (0-9)', test: (pw: string) => /[0-9]/.test(pw) },
  { text: 'At least 1 special character', test: (pw: string) => /[!#@$%^&*)(+=._-]/.test(pw) }
];
