import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// project import
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

// Lazy-loaded components
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/index')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/errors/PageNotFount')));
const Profile = Loadable(lazy(() => import('@/pages/account/profile')));
const ChangePassword = Loadable(lazy(() => import('@/pages/account/change-passwod')));
const Settings = Loadable(lazy(() => import('@/pages/account/settings')));
// User Setup Pages
const User = Loadable(lazy(() => import('@/pages/user')));
const UserRole = Loadable(lazy(() => import('@/pages/user-role')));
// Blog Pages
const BlogCategory = Loadable(lazy(() => import('@/pages/blog/category')));
// Inventory Pages
const ProductCategory = Loadable(lazy(() => import('@/pages/inventory/category')));
const Product = Loadable(lazy(() => import('@/pages/inventory/product')));

// ==============================|| PRIVATE ROUTES ||============================== //

const PrivateRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<Navigate to="dashboard/default" replace />} /> // Redirect to dashboard/default page
        <Route path="dashboard/default" element={<DashboardDefault />} />
        {/* Account Profile */}
        <Route path="account">
          <Route index element={<Navigate to="profile" replace />} /> // Redirect to personal page
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="blog">
          <Route path="category" element={<BlogCategory />} />
        </Route>
        <Route path="user-setup">
          <Route path="users" element={<User />} />
          <Route path="user-roles" element={<UserRole />} />
        </Route>
        <Route path="inventory">
          <Route path="products" element={<Product />} />
          <Route path="categories" element={<ProductCategory />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default PrivateRoutes;
