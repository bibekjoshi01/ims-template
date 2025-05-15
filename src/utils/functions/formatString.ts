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
