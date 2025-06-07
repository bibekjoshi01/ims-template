import { DynamicInfoSectionProps } from '@/components/detail-section/types';
import { ICustomerDetails } from '../../redux/types';
import { Path } from 'react-hook-form';

export function getViewCustomerConfig(data: ICustomerDetails): Omit<DynamicInfoSectionProps<ICustomerDetails>, 'data'> {
  const customLabels = {
    fullName: 'Full Name',
    email: 'Email',
    phoneNo: 'Phone Number',
    altPhoneNo: 'Alternate Phone Number',
    customerNo: 'Customer Number',
    isActive: 'Active Status',
    isPerson: 'Is Person',
    notes: 'Notes'
  } as Partial<Record<Path<ICustomerDetails>, string>>;

  const fieldOrder = ['fullName', 'email', 'customerNo', 'phoneNo', 'altPhoneNo'] as Path<ICustomerDetails>[];

  // Dynamically add address labels
  if (data?.addresses?.length) {
    data.addresses.forEach((address, index) => {
      const path = `addresses.${index}.address` as Path<ICustomerDetails>;
      customLabels[path] = address.label || `Address ${index + 1}`;
      fieldOrder.push(path);
    });
  }

  fieldOrder.push('isActive', 'isPerson', 'notes');

  return {
    excludeFields: ['id', 'photo', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
    fieldOrder,
    booleanFields: ['isActive', 'isPerson'],
    columns: 4,
    customLabels
  };
}
