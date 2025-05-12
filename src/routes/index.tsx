import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/libs/hooks';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { checkAuthStatus } from '@/pages/authentication/redux/auth.slice';

const Routes = () => {
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const isRehydrated = useAppSelector((state: any) => state._persist?.rehydrated);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status after rehydration
  useEffect(() => {
    if (isRehydrated) {
      dispatch(checkAuthStatus());
    }
  }, [isRehydrated, dispatch]);

  useEffect(() => {
    // wait for rehydration to complete before checking authentication status
    if (!isRehydrated) return;

    // Redirect to login if not authenticated and not already on the login page
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, isRehydrated, navigate]);

  // Don't render until rehydration completes
  if (!isRehydrated) return null;

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
