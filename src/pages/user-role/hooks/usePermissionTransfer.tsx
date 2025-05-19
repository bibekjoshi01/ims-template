import { useMemo } from 'react';
import { useMainModules } from './useMainModules';
import { useSubModules } from './useSubModules';
import { usePermissions } from './usePermissions';
import { UserPermission } from '../components/PermissionTransfer';

interface UsePermissionTransferParams {
  mainModuleId?: number;
  subModuleId?: number;
  selectedPermissionIds?: number[];
}

export function usePermissionTransfer({ mainModuleId, subModuleId, selectedPermissionIds = [] }: UsePermissionTransferParams) {
  const mainModuleOptions = useMainModules();
  const subModuleOptions = useSubModules(mainModuleId);
  const permissions = usePermissions(selectedPermissionIds, mainModuleId, subModuleId);

  // NOTE - Converts SelectOption[] to IUserPermission[] for the PermissionTransferList.
  const allPermissions: UserPermission[] = useMemo(() => permissions.map((perm) => ({ id: perm.value, name: perm.label })), [permissions]);

  // NOTE - Extracts the selected permissions to pass to the PermissionTransferList.
  const selectedPermissions: UserPermission[] = useMemo(
    () => allPermissions.filter((perm) => selectedPermissionIds.includes(perm.id as number)),
    [allPermissions, selectedPermissionIds]
  );

  return {
    mainModuleOptions,
    subModuleOptions,
    allPermissions,
    selectedPermissions
  };
}
