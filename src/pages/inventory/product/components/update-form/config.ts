import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const productUpdateFormSchema = z.object({
  id: z.number().min(1, 'Product ID is required'),
  name: z.string().optional(),
  sku: z.string().optional(),
  category: z.number().optional(),
  unit: z.number().optional(),
  sellingPrice: z.number().optional(),
  stockAlertQty: z.number().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional()
});

// NOTE - Generate a type from the schema
export type TProductUpdateFormDataType = z.infer<typeof productUpdateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: Partial<TProductUpdateFormDataType> = {
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
export const productUpdateFields: FormField<TProductUpdateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 3, type: 'text' },
  { name: 'sku', label: 'SKU', xs: 6, sm: 3, type: 'text' },
  { name: 'category', label: 'Category', xs: 6, sm: 3, type: 'select', options: [] },
  { name: 'unit', label: 'Unit', xs: 6, sm: 3, type: 'select', options: [] },
  { name: 'sellingPrice', label: 'Selling Price', xs: 6, sm: 3, type: 'number' },
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
