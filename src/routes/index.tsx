import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import { useAppSelector } from '@/libs/hooks';
import { authState } from '@/pages/authentication/redux/selector';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const Routes = () => {
  const { isAuthenticated } = useAppSelector(authState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
