import dayjs from 'dayjs';

/**
 * Formats a date string into a human-readable format.
 * Example: "2024-05-01T13:00:00Z" -> "May 1, 2024 1:00 PM"
 */
export const formatReadableDatetime = (dateStr?: string, format: string = 'MMM D, YYYY h:mm A'): string => {
  if (!dateStr) return '';
  return dayjs(dateStr).format(format);
};

// if date is a number, interpret it as a year and returns it
// if date is a string, parse it as an ISO date string and returns its year
// if date is a Date object, returns its year
export const parseToYear = (year: string | number | Date): number => {
  if (typeof year === 'number') return year;
  if (typeof year === 'string' || year instanceof Date) {
    const parsed = new Date(year).getFullYear();
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};
