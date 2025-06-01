import { ComponentType, useEffect, useState } from 'react';

import { IRequiredPermission } from '@/globals';
import { useAppDispatch } from '@/libs/hooks';
import { setPermissions } from '@/pages/common/redux/common.slice';
import Unauthorized from '@/pages/errors/Unauthorized';
import { extractPermissionStrings, useHasAnyPermissions } from './helpers';

interface Props {}

export const validatePermissions = <P extends Props>(Component: ComponentType<P>, requiredPermissions: IRequiredPermission) => {
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
