import { FormField } from '@/components/FormSection';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userRoleCreateFormSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  mainModule: z.union([z.number(), z.string()]).optional(),
  subModule: z.union([z.number(), z.string()]).optional(),
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
// NOTE - allPermissions and selectedPermissions field are being managed separately so, we exclude them
export const userRoleCreateFormFields: FormField<UserRoleCreateFormDataType>[] = [
  { name: 'name', label: 'Name', sm: 3, type: 'text' },
  { name: 'mainModule', label: 'Main Module', sm: 3.5, type: 'select', options: [], required: false },
  { name: 'subModule', label: 'Sub Module', sm: 3.5, type: 'select', options: [], required: false },
  {
    name: 'isActive',
    label: 'Active Status',
    sm: 2,
    type: 'checkbox',
    required: false
  }
];
