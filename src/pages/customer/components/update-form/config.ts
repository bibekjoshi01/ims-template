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

// NOTE - Schema definition of customer update form
export const customerUpdateFormSchema = z.object({
  id: z.number().min(1, 'Customer ID is required'),
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email').optional(),
  phoneNo: z.string(),
  altPhoneNo: z.string().optional(),
  isPerson: z.boolean(),
  gender: z.enum([GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.NA]).optional(),
  isActive: z.boolean(),
  notes: z.string().optional(),
  photo: z.any().optional(),
  addresses: z.array(customerAddressSchema).min(1, 'At least one address is required')
});

// NOTE - Inferred type
export type TCustomerUpdateFormDataType = z.infer<typeof customerUpdateFormSchema>;

// NOTE - Default values
export const defaultValues: TCustomerUpdateFormDataType = {
  id: 0,
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

export const customerUpdateFields: FormField<TCustomerUpdateFormDataType>[] = [
  { name: 'fullName', label: 'Full Name', xs: 6, sm: 3, type: 'text', required: true },
  { name: 'email', label: 'Email', xs: 6, sm: 3, type: 'email' },
  { name: 'phoneNo', label: 'Phone No', xs: 6, sm: 3, type: 'text' },
  { name: 'altPhoneNo', label: 'Alternate Phone No', xs: 6, sm: 3, type: 'text' },
  {
    name: 'isPerson',
    label: 'Customer Type',
    xs: 3,
    sm: 3,
    type: 'radio',
    options: [
      { label: 'Individual', value: true },
      { label: 'Business', value: false }
    ],
    inputStyle: { display: 'flex', flexDirection: 'row' },
    required: true
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
