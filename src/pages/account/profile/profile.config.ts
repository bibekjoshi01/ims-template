import { FormField } from '@/components/FormSection';
import * as z from 'zod';

export const updateProfileSchema = z.object({
  photo: z.union([z.instanceof(File), z.string().nullable()]).optional(),
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  phoneNo: z.string().min(10, 'Phone number is required')
});

export type UpdateProfileFormDataType = z.infer<typeof updateProfileSchema>;

export const defaultValues: UpdateProfileFormDataType = {
  firstName: '',
  lastName: '',
  phoneNo: '',
  photo: ''
};

export const personalInfoFields: FormField<UpdateProfileFormDataType>[] = [
  { name: 'firstName', label: 'First Name', xs: 12, sm: 6, type: 'text' },
  { name: 'lastName', label: 'Last Name', xs: 12, sm: 6, type: 'text' },
  { name: 'phoneNo', label: 'Phone Number', xs: 12, sm: 6, type: 'text' }
];
