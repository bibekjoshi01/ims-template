// mui-icons imports
import { FormatColorFill, FormatSize, QrCode } from '@mui/icons-material';
import { MenuItem } from './types';

// icons
const icons = {
  FormatSize,
  FormatColorFill,
  QrCode
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities: MenuItem = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/typography',
      icon: icons.FormatSize
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.FormatColorFill
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.QrCode
    }
  ]
};

export default utilities;
