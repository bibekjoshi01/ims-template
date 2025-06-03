import { FormField } from '@/components/app-form/types';
import { z } from 'zod';
import { LoginFormDataType } from '../redux/types';

export const loginSchema = z.object({
  persona: z.string().min(1, 'Persona is required'),
  password: z.string().min(1, 'Password is required')
});

export const defaultValues: LoginFormDataType = { persona: '', password: '' };

export const loginFields: FormField<LoginFormDataType>[] = [
  { name: 'persona', label: 'Email or Username', xs: 12, type: 'text', placeholder: 'Enter email or username' },
  { name: 'password', label: 'Password', xs: 12, type: 'password', placeholder: 'Enter password' }
];
