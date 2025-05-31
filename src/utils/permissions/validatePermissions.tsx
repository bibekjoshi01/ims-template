import { ComponentType, useEffect, useState } from 'react';

import Unauthorized from '@/components/Unauthorized';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { authState } from '@/pages/authentication/redux/selector';
import { setPermissions } from '@/pages/common/redux/common.slice';

interface Props {}
interface IRequiredPermission {
  view_permission?: string;
  edit_permission?: string;
  add_permission?: string;
  delete_permission?: string;
}

export function useHasParticularPermissions(permission: string): boolean {
  const { permissions, isSuperuser } = useAppSelector(authState);

  if (isSuperuser) return true;
  return permissions?.some((perm) => perm.codename === permission);
}

export function useHasAnyPermissions(requiredPermissions: string[]): boolean {
  const { permissions, isSuperuser } = useAppSelector(authState);

  if (isSuperuser) return true;
  return requiredPermissions.some((permission) => permissions?.some((perm) => perm.codename === permission));
}

const extractPermissionStrings = (permissionsArray: IRequiredPermission[]): string[] => {
  return permissionsArray.flatMap((obj) => Object.values(obj));
};

export const validatePermissions = <P extends Props>(Component: ComponentType<P>, requiredPermissions: IRequiredPermission[]) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const dispatch = useAppDispatch();

    // Extract permission strings once
    const permissionsStrings = extractPermissionStrings(requiredPermissions);
    const hasPermission = useHasAnyPermissions(permissionsStrings);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
      //set current component permission constants in redux
      dispatch(setPermissions(permissionsStrings));
      return () => {
        // remove permissions on unmount
        dispatch(setPermissions([]));
      };
    }, []);

    useEffect(() => {
      if (!hasPermission) {
        setShowMessage(true);
      }
    }, [hasPermission]);

    if (showMessage) return <Unauthorized />;

    return <Component {...props} />;
  };

  return WrappedComponent;
};
