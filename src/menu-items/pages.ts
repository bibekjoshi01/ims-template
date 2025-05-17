// mui-icons imports
import { DashboardOutlined } from '@mui/icons-material';
import { MenuItem } from './types';

// icons
const icons = { DashboardOutlined };

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
    }
  ]
};

export default pages;
