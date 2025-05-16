import { FormField } from '@/components/FormSection';
import { z } from 'zod';
import { ForgetPasswordRequestFormDataType } from '../redux/types';

export const forgetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const defaultValues: ForgetPasswordRequestFormDataType = { email: '' };

export const forgetPasswordRequestFields: FormField<ForgetPasswordRequestFormDataType>[] = [
  { name: 'email', label: 'Email', xs: 12, type: 'text', placeholder: 'Enter your email' }
];
