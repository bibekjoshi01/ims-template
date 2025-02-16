// mui-icons imports
import { Person } from '@mui/icons-material';
import { MenuItem } from './types';

// icons
const icons = {
  Person
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: MenuItem = {
  id: 'applications',
  title: 'Applications',
  type: 'group',
  children: [
    {
      id: 'account-settings',
      title: 'Account Settings',
      type: 'collapse',
      icon: icons.Person,
      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: '/account/profile'
        },
        {
          id: 'change-password',
          title: 'Change Password',
          type: 'item',
          url: '/account/change-password'
        },
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          url: '/account/settings'
        }
      ]
    }
  ]
};

export default applications;
