import { useEffect, useState } from 'react';
import { SelectOption } from '@/components/app-form/types';
import { useLazyGetUserRoleUserPermissionsQuery } from '../redux/user-role.api';

export const usePermissions = (selectedPermissions: number[], mainModule?: string | number, subModule?: string | number) => {
  const [fetchPermissions] = useLazyGetUserRoleUserPermissionsQuery();
  const [allPermissions, setAllPermissions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchAndSetPermissions = async () => {
      try {
        const res = await fetchPermissions({ mainModule, subModule }).unwrap();

        const newPermissions = res.results.map((perm) => ({
          label: perm.name,
          value: perm.id,
          groupName: `${perm.mainModuleName} - ${perm.permissionCategoryName}`
        }));

        // Combine currently selected permissions with fetched permissions
        const selectedPermDetails = selectedPermissions
          .map((id) => {
            return allPermissions.find((p) => p.value === id) || newPermissions.find((p) => p.value === id);
          })
          .filter(Boolean) as SelectOption[];

        const mergedPermissions = Array.from(
          new Map([...selectedPermDetails, ...newPermissions].map((perm) => [perm.value, perm])).values()
        );

        setAllPermissions(mergedPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchAndSetPermissions();
  }, [mainModule, subModule, selectedPermissions, fetchPermissions]);

  return allPermissions;
};
