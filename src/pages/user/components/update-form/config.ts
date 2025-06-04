import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userInfoUpdateFormSchema = z.object({
  id: z.number().min(1, 'User ID is required'),
  name: z.string().min(1, 'Full Name is required'),
  phoneNo: z.string().min(10, 'Phone No. must be at least 10 characters').optional(),
  isActive: z.boolean().optional(),
  roles: z.array(z.number()).min(1, 'At least one role is required'),
  photo: z.any().optional()
});

// NOTE - Generate a type from the schema
export type UserInfoUpdateFormDataType = z.infer<typeof userInfoUpdateFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: UserInfoUpdateFormDataType = {
  id: 0,
  name: '',
  phoneNo: '',
  roles: [],
  isActive: true,
  photo: undefined
};

// NOTE - Define the form fields
export const userInfoUpdateFields: FormField<UserInfoUpdateFormDataType>[] = [
  { name: 'name', label: 'Name', xs: 6, sm: 3, type: 'text' },
  { name: 'phoneNo', label: 'Phone No', xs: 6, sm: 3, type: 'text' },
  { name: 'roles', label: 'Roles', xs: 6, sm: 3, type: 'select', options: [], multipleChips: true },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 4,
    sm: 3,
    type: 'checkbox',
    trueLabel: 'Active',
    falseLabel: 'Inactive'
  },
  { name: 'photo', label: 'Profile Photo', xs: 6, sm: 3, type: 'image', imageSize: 120 }
];

export const uniqueFieldNames = ['phoneNo'] as const;
