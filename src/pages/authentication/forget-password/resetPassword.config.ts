import { z } from 'zod';

import { FormField } from '@/components/app-form/types';
import { ResetPasswordRequestFormDataType } from '../redux/types';

export const resetPasswordSchema = z
  .object({
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

export const defaultValues: ResetPasswordRequestFormDataType = { token: '', newPassword: '', confirmPassword: '' };

export const resetPasswordFields: FormField<ResetPasswordRequestFormDataType>[] = [
  { name: 'newPassword', label: 'New Password', xs: 12, type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', xs: 12, type: 'password' }
];
