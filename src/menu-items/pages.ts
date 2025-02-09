// mui-icons imports
import { AddCircleOutline, DashboardOutlined, ShoppingCartOutlined, Store } from '@mui/icons-material';
import { MenuItem } from './types';

// icons
const icons = {
  DashboardOutlined,
  AddCircleOutline,
  Store,
  ShoppingCartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const pages: MenuItem = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ShoppingCartOutlined,
      target: '_self',
      breadcrumbs: false
    }
  ]
};

export default pages;
