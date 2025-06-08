import { useEffect, useState } from 'react';
import { SelectOption } from '@/components/app-form/types';
import { useGetUserRoleMainModulesQuery } from '../redux/user-role.api';

export const useMainModules = () => {
  const { data: mainModulesData } = useGetUserRoleMainModulesQuery();
  const [mainModuleOptions, setMainModuleOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (mainModulesData?.results) {
      const options = mainModulesData.results.map((Module) => ({
        label: Module.name,
        value: Module.id as string | number
      }));

      setMainModuleOptions(options);
    }
  }, [mainModulesData]);

  return mainModuleOptions;
};
