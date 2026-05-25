// --------------------
// Types
// --------------------
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

export interface InfoItem {
  label: string;
  value: string | number | React.ReactNode;
}

export interface FileItem {
  name: string;
  url: string;
  isPdf?: boolean;
}

export interface MemberItem {
  id: string | number;
  fullName: string;
  designation?: string;
  photo?: string;
  isActive?: boolean;
}

// Section types
export type DetailSection<T = any> =
  | { type: 'dynamic-info'; dynamicInfoProps: DynamicInfoSectionProps<T> }
  | { type: 'html'; title: string; html: string }
  | { type: 'files'; files: FileItem[] }
  | { type: 'members'; members: MemberItem[] }
  | { type: 'custom'; render: () => React.ReactNode };

// --------------------
// Props
// --------------------
export interface DetailViewProps {
  title: string;
  avatar?: string;
  status?: 'active' | 'inactive';
  sections: DetailSection[];
  onClose: () => void;
}
