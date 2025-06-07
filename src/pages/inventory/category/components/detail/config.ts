import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { ICategoryDetails } from '../../redux/types';

export const viewCategoryConfig: Omit<DynamicInfoSectionProps<ICategoryDetails>, 'data'> = {
  excludeFields: ['id', 'icon', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
  fieldOrder: ['name', 'code', 'isActive'],
  booleanFields: ['isActive'],
  columns: 3,
  customLabels: {
    name: ' Name',
    code: 'Code',
    isActive: 'Active Status'
  }
};
