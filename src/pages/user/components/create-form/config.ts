import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// NOTE - Define the schema for the form.
export const userInfoFormSchema = z
  .object({
    username: z.string().optional(),
    name: z.string().min(1, 'Full Name is required'),
    phoneNo: z.string().min(10, 'Phone No. must be at least 10 characters').optional(),
    email: z.string().email('Invalid email address'),
    isActive: z.boolean().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!#@$%^&*)(+=._-]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(8, 'Confirm password must match password'),
    roles: z.array(z.number()).min(1, 'At least one role is required'),
    photo: z
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

// NOTE - Generate a type from the schema
export type UserInfoFormDataType = z.infer<typeof userInfoFormSchema>;

// NOTE -  Define default Values for the Form using the generated type
export const defaultValues: UserInfoFormDataType = {
  username: '',
  name: '',
  phoneNo: '',
  email: '',
  password: '',
  confirmPassword: '',
  isActive: true,
  roles: [],
  photo: undefined
};

// NOTE - Define the form fields
export const userInfoFields: FormField<UserInfoFormDataType>[] = [
  { name: 'username', label: 'Username', xs: 6, sm: 3, type: 'text' },
  { name: 'name', label: 'Full Name', xs: 6, sm: 3, type: 'text', required: true },
  { name: 'phoneNo', label: 'Phone No', xs: 6, sm: 3, type: 'text' },
  { name: 'email', label: 'Email', xs: 6, sm: 3, type: 'email', required: true },
  { name: 'password', label: 'Password', xs: 6, sm: 3, type: 'password', required: true },
  { name: 'confirmPassword', label: 'Confirm Password', xs: 6, sm: 3, type: 'password', required: true },
  { name: 'roles', label: 'Roles', xs: 6, sm: 3, type: 'select', options: [], multipleChips: true, required: true },
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

// NOTE - Define the password requirements
export const ReqObj = [
  { text: 'At least 8 characters', test: (pw: string) => pw.length >= 8 },
  { text: 'At least 1 lowercase letter (a-z)', test: (pw: string) => /[a-z]/.test(pw) },
  { text: 'At least 1 uppercase letter (A-Z)', test: (pw: string) => /[A-Z]/.test(pw) },
  { text: 'At least 1 number (0-9)', test: (pw: string) => /[0-9]/.test(pw) },
  { text: 'At least 1 special character', test: (pw: string) => /[!#@$%^&*)(+=._-]/.test(pw) }
];

export const uniqueFieldNames = ['username', 'email', 'phoneNo'] as const;
