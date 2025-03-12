// mui-icons imports
import { TableView } from '@mui/icons-material';
import { MenuItem } from './types';

// icons
const icons = {
  TableView
};

// ==============================|| MENU ITEMS - TABLES ||============================== //

const tables: MenuItem = {
  id: 'tables',
  title: 'Tables',
  type: 'group',
  children: [
    {
      id: 'appTable',
      title: 'App Table',
      type: 'collapse',
      icon: icons.TableView,
      children: [
        {
          id: 'Table-progressBar',
          title: 'Table-progressBar',
          type: 'item',
          url: '/tables/table1',
          breadcrumbs: false
        },
        {
          id: 'Table-datePicker',
          title: 'Table-datePicker',
          type: 'item',
          url: '/tables/table2',
          breadcrumbs: false
        },
        {
          id: 'Table-image',
          title: 'Table-image',
          type: 'item',
          url: '/tables/table3',
          breadcrumbs: false
        },
        {
          id: 'Table-links',
          title: 'Table-links',
          type: 'item',
          url: '/tables/table4',
          breadcrumbs: false
        },
        {
          id: 'Table-api',
          title: 'Table-API',
          type: 'item',
          url: '/tables/table5',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default tables;
