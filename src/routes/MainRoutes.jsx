import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import Dashboard from '@/layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Orders = Loadable(lazy(() => import('pages/orders/index')));
// Error Pages
const NotFoundPage = Loadable(lazy(() => import('pages/errors/404Page')));
const ServerErrorPage = Loadable(lazy(() => import('pages/errors/500Page')));
const UnderConstructionPage = Loadable(lazy(() => import('pages/errors/UnderConstructionPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'orders',
      element: <Orders />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    // New Error/Utility Pages
    {
      path: '500',
      element: <ServerErrorPage />
    },
    {
      path: 'under-construction',
      element: <UnderConstructionPage />
    },
    {
      path: '*', // Catch-all route for 404
      element: <NotFoundPage />
    }
  ]
};

export default MainRoutes;
