import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

export const userRoleCreateFormSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  mainModule: z.union([z.number(), z.string()]).optional(),
  subModule: z.union([z.number(), z.string()]).optional(),
  allPermissions: z.array(z.number()).optional(),
  selectedPermissions: z.array(z.number()).optional(),
  isActive: z.boolean().optional()
});

export type UserRoleCreateFormDataType = z.infer<typeof userRoleCreateFormSchema>;

export const defaultValues: UserRoleCreateFormDataType = {
  name: '',
  mainModule: '',
  subModule: '',
  isActive: true,
  allPermissions: [],
  selectedPermissions: []
};

// `allPermissions` and `selectedPermissions` are handled separately (not via FormSection)
export const userRoleCreateFormFields: FormField<UserRoleCreateFormDataType>[] = [
  { name: 'name', label: 'Name', sm: 3, type: 'text', required: true },
  { name: 'mainModule', label: 'Main Module', sm: 3.5, type: 'select', options: [], required: false },
  { name: 'subModule', label: 'Sub Module', sm: 3.5, type: 'select', options: [], required: false },
  { name: 'isActive', label: 'Active Status', sm: 2, type: 'checkbox', required: false }
];
