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
const Profile = Loadable(lazy(() => import('@/pages/account/profile')));
const ChangePassword = Loadable(lazy(() => import('@/pages/account/change-passwod')));
const Settings = Loadable(lazy(() => import('@/pages/account/settings')));
const Table1 = Loadable(lazy(() => import('@/pages/tables/table1')));
const Table2 = Loadable(lazy(() => import('@/pages/tables/table2')));
const Table3 = Loadable(lazy(() => import('@/pages/tables/table3')));
const Table4 = Loadable(lazy(() => import('@/pages/tables/table4')));
const Table5 = Loadable(lazy(() => import('@/pages/tables/table5')));
const User = Loadable(lazy(() => import('@/pages/user')));
const UserRole = Loadable(lazy(() => import('@/pages/user-role')));
// Blog Pages
const BlogCategory = Loadable(lazy(() => import('@/pages/blog/category')));

// ==============================|| PRIVATE ROUTES ||============================== //

const PrivateRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<Navigate to="dashboard/default" replace />} /> // Redirect to dashboard/default page
        <Route path="dashboard/default" element={<DashboardDefault />} />
        {/* table  */}
        <Route path="tables">
          <Route index element={<Navigate to="table1" replace />} />
          <Route path="table1" element={<Table1 />} />
          <Route path="table2" element={<Table2 />} />
          <Route path="table3" element={<Table3 />} />
          <Route path="table4" element={<Table4 />} />
          <Route path="table5" element={<Table5 />} />
        </Route>
        {/* Pages */}
        <Route path="orders" element={<Orders />} />
        <Route path="color" element={<Color />} />
        <Route path="shadow" element={<Shadow />} />
        <Route path="typography" element={<Typography />} />
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
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default PrivateRoutes;
