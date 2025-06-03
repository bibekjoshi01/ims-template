import * as z from 'zod';
import { FormField } from '@/components/app-form/types';

// NOTE - Define the schema for the form.
export const categoryUpdateFormSchema = z.object({
  id: z.number().min(1, 'Category ID is required'),
  name: z.string().optional(),
  code: z.string().optional(),
  isActive: z.boolean().optional(),
  description: z.string().optional(),
  icon: z.any().optional()
});

// NOTE - Generate a type from the schema
export type CategoryUpdateFormDataType = z.infer<typeof categoryUpdateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: CategoryUpdateFormDataType = {
  id: 0,
  name: '',
  code: '',
  description: '',
  isActive: false,
  icon: undefined
};

// NOTE - Define the form fields
export const categoryUpdateFields: FormField<CategoryUpdateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 4, type: 'text' },
  { name: 'code', label: 'Code Name', xs: 6, sm: 4, type: 'text' },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 4,
    sm: 2,
    type: 'checkbox',
    trueLabel: 'Active',
    falseLabel: 'Inactive'
  },
  { name: 'icon', label: 'Category', xs: 3, sm: 2, type: 'image', imageSize: 120 },
  { name: 'description', label: 'Description', xs: 12, sm: 12, type: 'text', multiline: true, rows: 5 }
];

export const uniqueFieldNames = ['code'] as const;
