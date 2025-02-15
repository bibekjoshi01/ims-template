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
      id: 'account-profile',
      title: 'Account Profile',
      type: 'collapse',
      icon: icons.Person,
      children: [
        {
          id: 'personal',
          title: 'Personal',
          type: 'item',
          url: '/profiles/account/personal'
        },
        {
          id: 'change-password',
          title: 'Change Password',
          type: 'item',
          url: '/profiles/account/change-password'
        },
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          url: '/profiles/account/settings'
        }
      ]
    }
  ]
};

export default applications;
