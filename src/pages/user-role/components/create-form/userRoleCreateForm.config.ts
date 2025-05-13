import { FormField } from '@/components/FormSection';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userRoleCreateFormSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  permissions: z.array(z.number()).optional(),
  isActive: z.boolean().optional()
});

// NOTE - Generate a type from the schema
export type UserRoleCreateFormDataType = z.infer<typeof userRoleCreateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: UserRoleCreateFormDataType = {
  name: '',
  permissions: [],
  isActive: true
};

// NOTE - Define the form fields
export const userRoleCreateFormFields: FormField<UserRoleCreateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 4, sm: 3, type: 'text' },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 2,
    sm: 2,
    type: 'checkbox',
    required: false
  },
  { name: 'permissions', label: 'Permissions', xs: 6, sm: 7, type: 'select', options: [], multipleChips: true, required: false }
];
