import { IRequiredPermission } from '@/globals';
import { useAppSelector } from '@/libs/hooks';
import { authState } from '@/pages/authentication/redux/selector';
import { IPermission } from '@/pages/authentication/redux/types';

export function useHasParticularPermissions(permission: string): boolean {
  const { permissions, isSuperuser } = useAppSelector(authState);

  if (isSuperuser) return true;
  return permissions?.some((perm: IPermission) => perm.codename === permission);
}

export function useHasAnyPermissions(requiredPermissions: string[]): boolean {
  const { permissions, isSuperuser } = useAppSelector(authState);

  if (isSuperuser) return true;
  return requiredPermissions.some((permission) => permissions?.some((perm) => perm.codename === permission));
}

export const extractPermissionStrings = (permissionsObj: IRequiredPermission): string[] => {
  return Object.values(permissionsObj);
};
