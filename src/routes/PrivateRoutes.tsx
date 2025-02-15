import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// project import
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

// Lazy-loaded components
const Color = Loadable(lazy(() => import('@/pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('@/pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('@/pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/index')));
const Orders = Loadable(lazy(() => import('@/pages/orders/index')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/404Page')));
const Personal = Loadable(lazy(() => import('@/pages/profiles/personal')));
const ChangePassword = Loadable(lazy(() => import('@/pages/profiles/change-passwod')));
const Settings = Loadable(lazy(() => import('@/pages/profiles/settings')));

// ==============================|| PRIVATE ROUTES ||============================== //

const PrivateRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<Navigate to="dashboard/default" replace />} /> // Redirect to dashboard/default page
        <Route path="dashboard/default" element={<DashboardDefault />} />
        {/* Pages */}
        <Route path="orders" element={<Orders />} />
        <Route path="color" element={<Color />} />
        <Route path="shadow" element={<Shadow />} />
        <Route path="typography" element={<Typography />} />
        {/* Account Profile */}
        <Route path="profiles/account">
          <Route index element={<Navigate to="personal" replace />} /> // Redirect to personal page
          <Route path="personal" element={<Personal />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default PrivateRoutes;
