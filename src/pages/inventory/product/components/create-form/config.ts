import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const productCreateFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().optional(),
  category: z.number().min(1, 'Category is required'),
  unit: z.number().min(1, 'Unit is required'),
  sellingPrice: z.number().min(0, 'Selling Price must be greater than 0'),
  stockAlertQty: z.number().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  image: z
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
export type TProductCreateFormDataType = z.infer<typeof productCreateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: Partial<TProductCreateFormDataType> = {
  name: '',
  sku: '',
  // category: 0,
  // unit: 0,
  sellingPrice: 0,
  stockAlertQty: 0,
  barcode: '',
  description: '',
  image: undefined
};

// NOTE - Define the form fields
export const productCreateFields: FormField<TProductCreateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 3, type: 'text', required: true },
  { name: 'sku', label: 'SKU', xs: 6, sm: 3, type: 'text' },
  { name: 'category', label: 'Category', xs: 6, sm: 3, type: 'select', options: [], required: true },
  { name: 'unit', label: 'Unit', xs: 6, sm: 3, type: 'select', options: [], required: true },
  { name: 'sellingPrice', label: 'Selling Price', xs: 6, sm: 3, type: 'number', required: true },
  { name: 'stockAlertQty', label: 'Stock Alert Qty', xs: 6, sm: 3, type: 'number' },
  { name: 'barcode', label: 'Barcode', xs: 6, sm: 4, type: 'text' },
  {
    name: 'image',
    label: 'Product Image',
    xs: 3,
    sm: 2,
    type: 'image',
    imageSize: 120
  },
  { name: 'description', label: 'Description', xs: 12, sm: 12, type: 'text', multiline: true, rows: 5 }
];

export const uniqueFieldNames = ['sku'] as const;
