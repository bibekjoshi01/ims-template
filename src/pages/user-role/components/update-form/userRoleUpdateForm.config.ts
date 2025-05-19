import { FormField } from '@/components/FormSection';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userRoleUpdateFormSchema = z.object({
  id: z.number().min(1, 'User Role ID is required'),
  name: z.string().min(1, 'Name is required').optional(),
  mainModule: z.union([z.number(), z.string()]).optional(),
  subModule: z.union([z.number(), z.string()]).optional(),
  allPermissions: z.array(z.number()).optional(),
  selectedPermissions: z.array(z.number()).optional(),
  isActive: z.boolean().optional()
});

// NOTE - Generate a type from the schema
export type UserRoleUpdateFormDataType = z.infer<typeof userRoleUpdateFormSchema>;

// NOTE - Define default values for the form using the generated type
export const defaultValues: UserRoleUpdateFormDataType = {
  id: 0,
  name: '',
  mainModule: '',
  subModule: '',
  isActive: true,
  allPermissions: [],
  selectedPermissions: []
};

// NOTE - Define the form fields
// NOTE - allPermissions and selectedPermissions field are being managed separately so, we exclude them
export const userRoleUpdateFormFields: FormField<UserRoleUpdateFormDataType>[] = [
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
