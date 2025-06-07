import * as z from 'zod';
import { FormField } from '@/components/app-form/types';
import { enumToOptions } from '@/utils/functions/formatString';
import { GenderEnum, AddressLabelEnum } from '../../redux/types';

// NOTE - Schema definition for customer address
export const customerAddressSchema = z.object({
  id: z.number().optional(),
  label: z.enum([AddressLabelEnum.DEFAULT, AddressLabelEnum.HOME, AddressLabelEnum.OFFICE]),
  address: z.string().min(1, 'Address is required')
});

export type Address = z.infer<typeof customerAddressSchema>;

// NOTE - Schema definition of customer create form
export const customerCreateFormSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email').optional(),
  phoneNo: z.string(),
  altPhoneNo: z.string().optional(),
  isPerson: z.boolean(),
  gender: z.enum([GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.NA]).optional(),
  isActive: z.boolean(),
  notes: z.string().optional(),
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
    .optional(),
  addresses: z.array(customerAddressSchema).min(1, 'At least one address is required')
});

// NOTE - Inferred type
export type TCustomerCreateFormDataType = z.infer<typeof customerCreateFormSchema>;

// NOTE - Default values
export const defaultValues: TCustomerCreateFormDataType = {
  fullName: '',
  email: '',
  phoneNo: '',
  altPhoneNo: '',
  isPerson: true,
  gender: GenderEnum.NA,
  notes: '',
  isActive: true,
  photo: undefined,
  addresses: [{ label: AddressLabelEnum.DEFAULT, address: '' }]
};

export const customerCreateFields: FormField<TCustomerCreateFormDataType>[] = [
  { name: 'fullName', label: 'Full Name', xs: 6, sm: 3, type: 'text', required: true },
  { name: 'email', label: 'Email', xs: 6, sm: 3, type: 'email' },
  { name: 'phoneNo', label: 'Phone No', xs: 6, sm: 3, type: 'text' },
  { name: 'altPhoneNo', label: 'Alt. Phone No', xs: 6, sm: 3, type: 'text' },
  {
    name: 'isPerson',
    label: 'Person Type',
    xs: 3,
    sm: 3,
    type: 'checkbox',
    trueLabel: 'Individual',
    falseLabel: 'Company'
  },
  {
    name: 'gender',
    label: 'Gender',
    xs: 3,
    sm: 3,
    type: 'select',
    options: enumToOptions(GenderEnum),
    showIf: (values) => values.isPerson === true
  },
  {
    name: 'isActive',
    label: 'Active Status',
    xs: 3,
    sm: 3,
    type: 'checkbox',
    trueLabel: 'Active',
    falseLabel: 'Inactive'
  },
  { name: 'photo', label: 'Photo', xs: 3, sm: 2, type: 'image', imageSize: 70 },
  {
    name: 'addresses',
    label: 'Addresses',
    type: 'array',
    required: true,
    xs: 6,
    sm: 6,
    itemFields: [
      {
        name: 'label',
        label: 'Label',
        type: 'select',
        options: enumToOptions(AddressLabelEnum),
        xs: 11,
        sm: 5
      },
      { name: 'address', label: 'Address', type: 'text', xs: 11, sm: 6 }
    ] as FormField<Address>[]
  },
  { name: 'notes', label: 'Notes', xs: 6, sm: 6, type: 'text', multiline: true, rows: 6 }
];

// NOTE - Unique fields
export const uniqueFieldNames = ['email', 'phoneNo'] as const;
