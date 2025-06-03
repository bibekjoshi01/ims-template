// mui-icons imports
import { DashboardOutlined } from '@mui/icons-material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { MenuItem } from './types';

// icons
const icons = { DashboardOutlined, SummarizeIcon };

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
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.SummarizeIcon,
      breadcrumbs: false
    }
  ]
};

export default pages;
