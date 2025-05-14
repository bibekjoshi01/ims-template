// project import
import applications from './applications';
import modules from './modules';
import pages from './pages';
import { MenuItems } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
  items: [pages, applications, modules]
};

export default menuItems;
