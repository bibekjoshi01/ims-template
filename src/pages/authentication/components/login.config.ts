import { FormField } from '@/components/FormSection';
import { LoginFormDataType } from '../redux/types';

export const defaultValues: LoginFormDataType = { persona: '', password: '' };

export const loginFields: FormField<LoginFormDataType>[] = [
  { name: 'persona', label: 'Email or Username', xs: 12, type: 'text' },
  { name: 'password', label: 'Password', xs: 12, type: 'password' }
];
