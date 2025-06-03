import { z } from 'zod';

// project imports
import { FormField } from '@/components/app-form/types';
import { ForgetPasswordRequestFormDataType } from '../redux/types';

export const forgetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const defaultValues: ForgetPasswordRequestFormDataType = { email: '' };

export const forgetPasswordRequestFields: FormField<ForgetPasswordRequestFormDataType>[] = [
  { name: 'email', label: 'Email Address', xs: 12, type: 'text', placeholder: 'Enter your email' }
];
