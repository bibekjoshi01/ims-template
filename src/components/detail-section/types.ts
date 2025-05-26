export interface InfoFieldProps {
  label: string;
  value: any;
}

export interface DynamicInfoSectionProps {
  data: Record<string, any>;
  columns?: number;
  excludeFields?: string[];
  dateTimeFields?: string[];
  customLabels?: Record<string, string>;
  fieldOrder?: string[];
}
