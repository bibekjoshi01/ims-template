import { SelectOption } from '@/components/app-form/types';

// example : phoneNo => phone no
export function camelCaseToNormal(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();
}
// example : phoneNo => phone_no
export function camelCaseToSnakeCase(field: string): string {
  return field
    .replace(/([A-Z])/g, '_$1')
    .trim()
    .toLowerCase();
}

// Helper: Capitalize the first letter of a string
export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// enum GenderEnum {
//   MALE = 'MALE',
//   FEMALE = 'FEMALE',
//   NA = 'NA'
// }

// converts this to

// [
//   { label: 'Male', value: 'MALE' },
//   { label: 'Female', value: 'FEMALE' },
//   { label: 'NA', value: 'NA' }
// ]
export function enumToOptions(e: Record<string, string>): SelectOption[] {
  return Object.entries(e).map(([key, value]) => ({
    label: key === 'NA' ? 'NA' : capitalizeFirst(key.toLowerCase()).replaceAll('_', ' '),
    value
  }));
}
