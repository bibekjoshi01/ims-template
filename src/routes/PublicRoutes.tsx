import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loadable from '@/components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// Lazy-loaded components
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/login')));
const ForgetPassword = Loadable(lazy(() => import('@/pages/authentication/ForgetPassword')));
const ResetPassword = Loadable(lazy(() => import('@/pages/authentication/ResetPassword')));
const ResetPasswordSuccess = Loadable(lazy(() => import('@/pages/authentication/ResetPasswordSuccess')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/404Page')));
const PrivacyPolicy = Loadable(lazy(() => import('@/pages/legal/PrivacyPolicies')));
const TermsAndConditions = Loadable(lazy(() => import('@/pages/legal/TermsAndConditions')));

// ==============================|| PUBLIC ROUTES ||============================== //

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="reset-password-success" element={<ResetPasswordSuccess />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  </>
);

export default PublicRoutes;
