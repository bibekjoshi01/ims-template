import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import { useAppSelector } from '@/libs/hooks';
import { authState } from '@/pages/authentication/redux/selector';

// ==============================|| ROUTING RENDER ||============================== //

const Routes = () => {
  const { isAuthenticated } = useAppSelector(authState);

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
