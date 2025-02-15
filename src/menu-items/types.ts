import { SvgIconTypeMap } from '@mui/material';
import { ChipProps } from '@mui/material/Chip';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ChipData {
  color?: ChipProps['color'];
  variant?: ChipProps['variant'];
  size?: ChipProps['size'];
  label?: string;
  avatar?: any;
}

export interface MenuItem {
  id: string;
  title: string;
  type: 'group' | 'item' | 'collapse';
  url?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  breadcrumbs?: boolean;
  external?: boolean;
  target?: '_self' | '_blank';
  disabled?: boolean;
  children?: MenuItem[];
  chip?: ChipData;
}

export interface MenuItems {
  items: MenuItem[];
}

export interface TabItem {
  id: string;
  title: string;
  url?: string;
  tabPanel?: React.ElementType;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}
