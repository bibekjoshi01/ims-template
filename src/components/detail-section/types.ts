export interface InfoFieldProps {
  label: string;
  value: string | number | React.ReactNode | (string | number)[];
}

export interface DynamicInfoSectionProps {
  data: Record<string, any>;
  columns?: number;
  excludeFields?: string[];
  dateTimeFields?: string[];
  booleanFields?: string[];
  customLabels?: Record<string, string>;
  fieldOrder?: string[];
}
