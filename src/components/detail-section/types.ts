import { Path } from 'react-hook-form';

export interface InfoFieldProps {
  label: string;
  value: string | number | React.ReactNode | (string | number)[];
}

export interface DynamicInfoSectionProps<T> {
  data: T;
  columns?: number;
  excludeFields?: (keyof T)[] | Path<T>[];
  dateTimeFields?: (keyof T)[] | Path<T>[];
  booleanFields?: (keyof T)[] | Path<T>[];
  customLabels?: Partial<Record<keyof T | Path<T>, string>>;
  fieldOrder?: (keyof T)[] | Path<T>[];
}
