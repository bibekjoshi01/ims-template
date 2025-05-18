import dayjs from 'dayjs';

/**
 * Formats a date string into a human-readable format.
 * Example: "2024-05-01T13:00:00Z" -> "May 1, 2024 1:00 PM"
 */
export const formatReadableDatetime = (dateStr?: string, format: string = 'MMM D, YYYY h:mm A'): string => {
  if (!dateStr) return '';
  return dayjs(dateStr).format(format);
};
