import { FormField } from '@/components/FormSection';
import * as z from 'zod';

/* --------------------------------- || Steps ||  --------------------------------- */

// 1. Define Schema and Types
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

// 2. Generate a type from the schema
export type ChangePasswordFormDataType = z.infer<typeof changePasswordSchema>;

// 3. Define default Values for the Form using the generated type
export const defaultValues: ChangePasswordFormDataType = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

// 4. Define the form fields
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
