import { useEffect } from 'react';

// Project Imports
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { checkAuthStatus } from '@/pages/authentication/redux/auth.slice';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Routes = () => {
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const isRehydrated = useAppSelector((state: any) => state._persist?.rehydrated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRehydrated) {
      dispatch(checkAuthStatus());
    }
  }, [isRehydrated, dispatch]);

  // Don't render until rehydration completes
  if (!isRehydrated) return null;

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
