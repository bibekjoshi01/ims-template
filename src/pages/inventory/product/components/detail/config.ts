import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { IProductDetails } from '../../redux/types';

export const viewProductConfig: Omit<DynamicInfoSectionProps, 'data'> = {
  excludeFields: ['id', 'image', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
  fieldOrder: ['name', 'sku', 'sellingPrice', 'stockAlertQty', 'barcode', 'isActive', 'category.name', 'unit.name', 'description'],
  booleanFields: ['isActive'],
  columns: 4,
  customLabels: {
    name: 'Product Name',
    sku: 'SKU',
    category: 'Category',
    'category.name': 'Category',
    'unit.name': 'Unit',
    sellingPrice: 'Selling Price',
    stockAlertQty: 'Stock Alert Qty',
    barcode: 'Barcode',
    isActive: 'Active Status',
    description: 'Description'
  }
};
