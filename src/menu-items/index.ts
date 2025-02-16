// project import
import applications from './applications';
import modules from './modules';
import pages from './pages';
import { MenuItems } from './types';
import utilities from './utilities';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
  items: [pages, applications, modules, utilities]
};

export default menuItems;
