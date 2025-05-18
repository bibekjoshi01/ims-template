import { FormField } from '@/components/FormSection';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userRoleCreateFormSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  mainModule: z.string().optional(),
  subModule: z.string().optional(),
  allPermissions: z.array(z.number()).optional(),
  selectedPermissions: z.array(z.number()).optional(),
  isActive: z.boolean().optional()
});

// NOTE - Generate a type from the schema
export type UserRoleCreateFormDataType = z.infer<typeof userRoleCreateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: UserRoleCreateFormDataType = {
  name: '',
  mainModule: '',
  subModule: '',
  isActive: true,
  allPermissions: [],
  selectedPermissions: []
};

// NOTE - Define the form fields
export const userRoleCreateFormFields: FormField<UserRoleCreateFormDataType>[] = [
  { name: 'name', label: 'Name', sm: 6, type: 'text' },
  {
    name: 'isActive',
    label: 'Active Status',
    sm: 6,
    type: 'checkbox',
    required: false
  },
  { name: 'mainModule', label: 'Main Module', sm: 6, type: 'select', options: [], required: false },
  { name: 'subModule', label: 'Sub Module', sm: 6, type: 'select', options: [], required: false },
  { name: 'allPermissions', label: 'All Permissions', sm: 6, type: 'select', options: [], multipleChips: true, required: false },
  {
    name: 'selectedPermissions',
    label: 'Selected Permissions',
    sm: 6,
    type: 'select',
    options: [],
    multipleChips: true,
    required: false
  }
];
