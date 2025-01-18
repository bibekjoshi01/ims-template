import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const isAuthenticated = false;

const Routes = () => (isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />);

export default Routes;
