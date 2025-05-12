// mui-icons
import FeedIcon from '@mui/icons-material/Feed';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

// project-imports
import { MenuItem } from './types';

// icons
const icons = {
  FeedIcon,
  InventoryIcon,
  SupervisedUserCircleIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const modules: MenuItem = {
  id: 'modules',
  title: 'Modules',
  type: 'group',
  children: [
    {
      id: 'blog',
      title: 'Blog',
      type: 'collapse',
      icon: icons.FeedIcon,
      children: [
        {
          id: 'posts',
          title: 'Posts',
          type: 'item',
          url: '/blog/posts',
          breadcrumbs: false
        },
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/blog/category',
          breadcrumbs: false
        },
        {
          id: 'tags',
          title: 'Tags',
          type: 'item',
          url: '/blog/tags',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'user-role',
      title: 'User Setup',
      type: 'collapse',
      icon: icons.SupervisedUserCircleIcon,
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/user-setup/users',
          breadcrumbs: false
        },
        {
          id: 'user-roles',
          title: 'User Roles',
          type: 'item',
          url: '/user-setup/user-roles',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'collapse',
      icon: icons.InventoryIcon,
      children: [
        {
          id: 'item',
          title: 'Item Setup',
          type: 'item',
          url: '/inventory/item',
          breadcrumbs: false
        },
        {
          id: 'purchase',
          title: 'Purchases',
          type: 'item',
          url: '/inventory/purchase',
          breadcrumbs: false
        },
        {
          id: 'sales',
          title: 'Sales',
          type: 'item',
          url: '/inventory/sales',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default modules;
