// material-ui imports
import { LockOutlined, PersonOutline, SettingsOutlined } from '@mui/icons-material';

// project imports
import { TabItem } from '@/menu-items/types';

export const TabItems: TabItem[] = [
  {
    id: 'profile',
    title: 'Profile',
    icon: PersonOutline,
    url: '/account/profile'
  },
  {
    id: 'change-password',
    title: 'Change Password',
    icon: LockOutlined,
    url: '/account/change-password'
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: SettingsOutlined,
    url: '/account/settings'
  }
];
