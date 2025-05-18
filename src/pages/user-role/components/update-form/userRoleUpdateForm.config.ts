import { FormField } from '@/components/FormSection';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userRoleUpdateFormSchema = z.object({
  id: z.number().min(1, 'User Role ID is required'),
  name: z.string().optional(),
  permissions: z.array(z.number()).optional(),
  isActive: z.boolean().optional(),
  remarks: z.string().optional()
});

// NOTE - Generate a type from the schema
export type UserRoleUpdateFormDataType = z.infer<typeof userRoleUpdateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: UserRoleUpdateFormDataType = {
  id: 0,
  name: '',
  permissions: [],
  isActive: true
};

// NOTE - Define the form fields
export const userRoleUpdateFormFields: FormField<UserRoleUpdateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 3, type: 'text' },
  { name: 'remarks', label: 'Remarks', xs: 6, sm: 3, type: 'text' },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 4,
    sm: 3,
    type: 'checkbox'
  },
  { name: 'permissions', label: 'Permissions', xs: 12, type: 'select', options: [], multipleChips: true }
];
