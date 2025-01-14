import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loadable from '@/components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// Lazy-loaded components
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('@/pages/authentication/register')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/404Page')));

// ==============================|| PUBLIC ROUTES ||============================== //

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default PublicRoutes;
