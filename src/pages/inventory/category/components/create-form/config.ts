import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const categoryCreateFormSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  isActive: z.boolean().optional(),
  description: z.string().optional(),
  icon: z
    .any()
    .refine(
      (file) => {
        if (!file) return true;
        const f = file instanceof FileList ? file[0] : file;
        return f instanceof File && f.type.startsWith('image/');
      },
      {
        message: 'Only image files are allowed'
      }
    )
    .optional()
});

// NOTE - Generate a type from the schema
export type TCategoryCreateFormDataType = z.infer<typeof categoryCreateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: TCategoryCreateFormDataType = {
  name: '',
  code: '',
  description: '',
  isActive: false,
  icon: undefined
};

// NOTE - Define the form fields
export const categoryInfoFields: FormField<TCategoryCreateFormDataType>[] = [
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
  { name: 'icon', label: 'Category Icon', xs: 3, sm: 2, type: 'image', imageSize: 120 },
  { name: 'description', label: 'Description', xs: 12, sm: 12, type: 'text', multiline: true, rows: 5 }
];

export const uniqueFieldNames = ['code'] as const;
