import { FormField } from '@/components/app-form/types';
import * as z from 'zod';
import { countryOptions } from '../../constants/countries';

export const supplierUpdateFormSchema = z.object({
  id: z.number().min(1, 'Category ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  contactPerson: z
    .string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name cannot exceed 100 characters'),
  email: z.string().optional(),
  phoneNo: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format'),
  altPhoneNo: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\+?[\d\s\-()]+$/.test(val), 'Invalid alternate phone number format'),
  address: z.string().optional(),
  country: z.string().optional(),
  website: z.string().optional(),
  taxId: z.string().optional().nullable(),
  isActive: z.boolean(),
  notes: z.string()
});

export type TSupplierUpdateFormDataType = z.infer<typeof supplierUpdateFormSchema>;

export const defaultValues = { id: 0 };

export const supplierUpdateFields: FormField<TSupplierUpdateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 4, type: 'text', required: true, autoFocus: true },
  { name: 'contactPerson', label: 'Contact Person', xs: 6, sm: 4, type: 'text', required: true },
  { name: 'email', label: 'Email', xs: 6, sm: 4, type: 'email' },
  { name: 'phoneNo', label: 'Phone No.', xs: 6, sm: 4, type: 'text', required: true },
  { name: 'altPhoneNo', label: 'Alt. Phone No.', xs: 6, sm: 4, type: 'text' },
  { name: 'country', label: 'Country', xs: 6, sm: 4, type: 'select', options: countryOptions },
  { name: 'address', label: 'Address', xs: 12, sm: 8, type: 'text' },
  { name: 'website', label: 'Website', xs: 6, sm: 4, type: 'text' },
  { name: 'taxId', label: 'Tax ID', xs: 6, sm: 4, type: 'text' },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 4,
    sm: 2,
    type: 'checkbox',
    trueLabel: 'Active',
    falseLabel: 'Inactive'
  },
  { name: 'notes', label: 'Additional Notes', xs: 8, sm: 6, type: 'text', multiline: true, rows: 5 }
];

export const uniqueFieldNames = ['name', 'email', 'phoneNo', 'altPhoneNo', 'website'] as const;
