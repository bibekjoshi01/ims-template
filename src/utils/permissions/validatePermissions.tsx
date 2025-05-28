import Unauthorized from '@/components/Unauthorized';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { authState } from '@/pages/authentication/redux/selector';
import { setPermissions } from '@/pages/common/redux/common.slice';
import { ComponentType, useEffect, useState } from 'react';

interface Props {}
interface Permission {
  id: string;
  [key: string]: string;
}

export function useHasRequiredPermissions(requiredPermissions: Permission[]): boolean {
  const { userPermissions, isSuperuser } = useAppSelector(authState);

  return (
    isSuperuser ||
    requiredPermissions.some((permissionObj: Permission) => {
      Object.values(permissionObj).some((permission: string) => userPermissions?.some((perm) => perm?.codename === permission));
    })
  );
}

export const validatePermissions = <P extends Props>(Component: ComponentType<P>, requiredPermissions: any[]) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const dispatch = useAppDispatch();
    const hasPermission = useHasRequiredPermissions(requiredPermissions);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      return () => {
        dispatch(setPermissions([]));
      };
    }, []);

    useEffect(() => {
      if (!hasPermission) {
        setOpenModal(true);
      }
    }, [hasPermission]);

    if (openModal) {
      return <Unauthorized />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};
