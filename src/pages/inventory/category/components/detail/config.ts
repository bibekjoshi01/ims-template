import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { ICategoryDetails } from '../../redux/types';

const excludeFields: (keyof ICategoryDetails)[] = ['id', 'icon', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'];
const fieldOrder: (keyof ICategoryDetails)[] = ['name', 'code', 'isActive'];
const booleanFields: (keyof ICategoryDetails)[] = ['isActive'];

export const viewCategoryConfig: Omit<DynamicInfoSectionProps, 'data'> = {
  excludeFields,
  fieldOrder,
  booleanFields,
  customLabels: {
    name: ' Name',
    code: 'Code',
    isActive: 'Active Status'
  } as Record<keyof ICategoryDetails, string>,
  columns: 3
};
