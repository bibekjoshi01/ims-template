// mui-icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import FeedIcon from '@mui/icons-material/Feed';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Person3Icon from '@mui/icons-material/Person3';
import Person4Icon from '@mui/icons-material/Person4';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreIcon from '@mui/icons-material/Store';
import StorefrontIcon from '@mui/icons-material/Storefront';
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
  Person4Icon,
  StorefrontIcon,
  HeadphonesIcon,
  Person3Icon,
  PrecisionManufacturingIcon,
  ReceiptIcon,
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
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customers',
      icon: icons.HeadphonesIcon,
      breadcrumbs: false
    },
    {
      id: 'supplier',
      title: 'Supplier',
      type: 'item',
      url: '/suppliers',
      breadcrumbs: false,
      icon: icons.PrecisionManufacturingIcon
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
          id: 'product-category',
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
    },
    {
      id: 'purchase',
      title: 'Purchase',
      type: 'collapse',
      icon: icons.StorefrontIcon,
      children: []
    },
    {
      id: 'sales',
      title: 'Sales',
      type: 'collapse',
      icon: icons.ReceiptIcon,
      children: []
    },
    {
      id: 'staff-management',
      title: 'Manage Staff',
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
    }
  ]
};

export default modules;
