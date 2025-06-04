import { forwardRef, useEffect } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project import
import { handlerActiveItem, useGetMenuMaster } from '@/api/menu';
import { MenuItem } from '@/menu-items/types';

type ListItemProps =
  | { component: keyof JSX.IntrinsicElements; href: string; target?: string }
  | {
      component: React.ForwardRefExoticComponent<
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'ref'> & React.RefAttributes<HTMLAnchorElement>
      >;
    };

export default function NavItem({ item, level }: { item: MenuItem; level: number }) {
  const theme = useTheme();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const openItem = menuMaster?.openedItem;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: ListItemProps;

  if (item?.external) {
    listItemProps = { component: 'a', href: item.url!, target: itemTarget };
  } else {
    listItemProps = {
      component: forwardRef<HTMLAnchorElement, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'ref'>>((props, ref) => (
        <Link ref={ref} {...props} to={item?.url!} target={itemTarget} />
      ))
    };
  }

  const Icon = item.icon;
  const itemIcon = Icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : null;

  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: item?.url ?? '', end: false }, pathname) || openItem === item.id;

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';
  const textSelectedColor = theme.palette.mode === 'dark' ? 'common.white' : iconSelectedColor;
  const bgColor = theme.palette.mode == 'dark' ? 'action.hover' : 'primary.lighter';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item?.disabled || false}
      onClick={() => handlerActiveItem(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        '&:hover': {
          bgcolor: bgColor
        },
        ...(drawerOpen && {
          '&.Mui-selected': {
            bgcolor: bgColor,
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: textSelectedColor,
            '&:hover': {
              color: textSelectedColor,
              bgcolor: bgColor
            }
          }
        })
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? textSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item?.chip && (
        <Chip
          color={item?.chip.color}
          variant={item?.chip.variant}
          size={item?.chip.size}
          label={item?.chip.label}
          avatar={item?.chip.avatar && <Avatar>{item?.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
}
