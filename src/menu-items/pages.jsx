// assets
import { DashboardOutlined, PlusOutlined, ShopFilled, ShoppingCartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  PlusOutlined,
  ShopFilled,
  ShoppingCartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const pages = {
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
      target: false,
      breadcrumbs: false
    }
  ]
};

export default pages;
