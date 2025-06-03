// mui-icons imports
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuItem } from './types';

// icons
const icons = { HelpIcon, SettingsIcon };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const others: MenuItem = {
  id: 'others',
  title: 'Other',
  type: 'group',
  children: [
    {
      id: 'site-settings',
      title: 'App Settings',
      type: 'item',
      url: '/app-settings',
      icon: icons.SettingsIcon,
      breadcrumbs: false
    },
    {
      id: 'help',
      title: 'Help',
      type: 'item',
      url: '/help',
      icon: icons.HelpIcon,
      breadcrumbs: false
    }
  ]
};

export default others;
