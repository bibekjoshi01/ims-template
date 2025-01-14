import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// project import
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

// Lazy-loaded components
const Color = Loadable(lazy(() => import('@/pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('@/pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('@/pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/index')));
const Orders = Loadable(lazy(() => import('@/pages/orders/index')));

// Error Pages
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/404Page')));
const ServerErrorPage = Loadable(lazy(() => import('@/pages/errors/500Page')));
const UnderConstructionPage = Loadable(lazy(() => import('@/pages/errors/UnderConstructionPage')));

// ==============================|| PRIVATE ROUTES ||============================== //

const PrivateRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {/* Dashboard */}
      <Route index element={<DashboardDefault />} />
      <Route path="dashboard/default" element={<DashboardDefault />} />

      {/* Pages */}
      <Route path="orders" element={<Orders />} />
      <Route path="color" element={<Color />} />
      <Route path="shadow" element={<Shadow />} />
      <Route path="typography" element={<Typography />} />

      {/* Error Pages */}
      <Route path="500" element={<ServerErrorPage />} />
      <Route path="under-construction" element={<UnderConstructionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default PrivateRoutes;
