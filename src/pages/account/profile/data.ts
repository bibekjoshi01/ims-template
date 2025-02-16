import { FormField } from '@/components/FormSection';
import countries from '@/utils/countries';
import * as z from 'zod';

/* --------------------------------- || Steps ||  --------------------------------- */

// 1. Define the schema for the form.
export const userProfileSchema = z.object({
  // Personal Info
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  country: z.string().min(1, 'Country is required'),
  zipcode: z.string().min(1, 'Zipcode is required'),
  bio: z.string().optional(),
  image: z.any().optional(),

  // Contact Info
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  portfolio: z.string().optional(),
  address: z.string().optional()
});

// 2. Generate a type from the schema
export type UserProfileFormDataType = z.infer<typeof userProfileSchema>;

// 3. Define default Values for the Form using the generated type
export const defaultValues: UserProfileFormDataType = {
  // Personal defaults
  firstName: 'Manish',
  lastName: 'Joshi',
  country: 'Sankhamul, Kathmandu',
  zipcode: '956754',
  bio: "Hello, I'm Manish Joshi...",
  image: null,

  // Contact defaults
  countryCode: 'NP',
  phoneNumber: '9814632244',
  email: 'nanish@gmail.com',
  portfolio: 'https://manish-joshi.vercel.app/',
  address: 'Sankhamul, Kathmandu'
};

// 4. Define the form fields
export const personalInfoFields: FormField<UserProfileFormDataType>[] = [
  { name: 'firstName', label: 'First Name', xs: 12, sm: 6, type: 'text' },
  { name: 'lastName', label: 'Last Name', xs: 12, sm: 6, type: 'text' },
  { name: 'country', label: 'Country', xs: 12, sm: 6, type: 'text' },
  { name: 'zipcode', label: 'Zipcode', xs: 12, sm: 6, type: 'text' },
  { name: 'bio', label: 'Bio', xs: 12, multiline: true, rows: 4, type: 'text' }
];

export const contactInfoFields: FormField<UserProfileFormDataType>[] = [
  {
    name: 'countryCode',
    label: 'Country Code',
    type: 'select',
    xs: 5,
    options: countries.map((country) => ({
      label: `${country.label} (${country.code}) +${country.phone}`,
      src: `https://flagcdn.com/w20/${country.code.toLowerCase()}.png`,
      value: country.code
    }))
  },
  { name: 'phoneNumber', label: 'Phone Number', xs: 7, type: 'text' },
  { name: 'email', label: 'Email Address', xs: 12, type: 'email' },
  { name: 'portfolio', label: 'Portfolio URL', xs: 12, type: 'text' },
  { name: 'address', label: 'Address', xs: 12, type: 'text' }
];
