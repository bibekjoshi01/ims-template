/**
 * Password validator for login pages
 */

// has number
const hasNumber = (password: string): boolean => new RegExp(/[0-9]/).test(password);

// has mix of small and capitals
const hasMixed = (password: string): boolean => new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);

// has special chars
const hasSpecial = (password: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(password);

// Define the return type for strengthColor
interface StrengthColor {
  label: string;
  color: string;
}

// set color based on password strength
export const strengthColor = (count: number): StrengthColor => {
  if (count < 2) return { label: 'Poor', color: 'error.main' };
  if (count < 3) return { label: 'Weak', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Good', color: 'success.main' };
  if (count < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (password: string): number => {
  let strengths = 0;
  if (password.length > 5) strengths += 1;
  if (password.length > 7) strengths += 1;
  if (hasNumber(password)) strengths += 1;
  if (hasSpecial(password)) strengths += 1;
  if (hasMixed(password)) strengths += 1;
  return strengths;
};
