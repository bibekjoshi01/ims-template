import { useEffect, useState } from 'react';
import { SelectOption } from '@/components/app-form/types';
import { useLazyGetUserRolePermissionCategoriesQuery } from '../redux/user-role.api';

export const useSubModules = (mainModule: number | string | undefined) => {
  const [fetchSubModules] = useLazyGetUserRolePermissionCategoriesQuery();
  const [subModuleOptions, setSubModuleOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchSubModulesData = async () => {
      if (mainModule) {
        const res = await fetchSubModules({ mainModule }).unwrap();
        const options = res.results.map((subModule) => ({
          label: subModule.name,
          value: subModule.id as number
        }));
        setSubModuleOptions(options);
      } else {
        setSubModuleOptions([]);
      }
    };
    fetchSubModulesData();
  }, [mainModule, fetchSubModules]);

  return subModuleOptions;
};
