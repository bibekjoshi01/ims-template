// mui-icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import FeedIcon from '@mui/icons-material/Feed';
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Person3Icon from '@mui/icons-material/Person3';
import StoreIcon from '@mui/icons-material/Store';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

// project-imports
import { MenuItem } from './types';

// icons
const icons = {
  FeedIcon,
  InventoryIcon,
  SupervisedUserCircleIcon,
  AddShoppingCartIcon,
  ManageAccountsIcon,
  Person3Icon,
  CategoryIcon,
  StoreIcon
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
          icon: icons.Person3Icon,
          type: 'item',
          url: '/user-setup/users',
          breadcrumbs: false
        },
        {
          id: 'user-roles',
          title: 'User Roles',
          type: 'item',
          icon: icons.ManageAccountsIcon,
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
          id: 'store',
          title: 'Stores',
          icon: icons.StoreIcon,
          type: 'item',
          url: '/inventory/stores',
          breadcrumbs: false
        },
        {
          id: 'category',
          title: 'Categories',
          type: 'item',
          icon: icons.CategoryIcon,
          url: '/inventory/categories',
          breadcrumbs: false
        },
        {
          id: 'product',
          title: 'Products',
          type: 'item',
          url: '/inventory/products',
          icon: icons.AddShoppingCartIcon,
          breadcrumbs: false
        },
        {
          id: 'stock',
          title: 'Stocks',
          type: 'item',
          icon: icons.InventoryIcon,
          url: '/inventory/stocks',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default modules;
