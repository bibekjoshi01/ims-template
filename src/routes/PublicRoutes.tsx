import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loadable from '@/components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// Lazy-loaded components
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/login')));
const VerifyAccount = Loadable(lazy(() => import('@/pages/authentication/login/VerifyAccount')));
const ForgetPasswordReqeust = Loadable(lazy(() => import('@/pages/authentication/forget-password/ForgetPasswordReqeust')));
const ResetPassword = Loadable(lazy(() => import('@/pages/authentication/forget-password/ResetPassword')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/PageNotFound')));
const PrivacyPolicy = Loadable(lazy(() => import('@/pages/legal/PrivacyPolicies')));
const TermsAndConditions = Loadable(lazy(() => import('@/pages/legal/TermsAndConditions')));

// ==============================|| PUBLIC ROUTES ||============================== //

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        <Route path="" element={<AuthLogin />} />
        <Route path="/verify-account/:token" element={<VerifyAccount />} />
        <Route path="/forget-password" element={<ForgetPasswordReqeust />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  </>
);

export default PublicRoutes;
