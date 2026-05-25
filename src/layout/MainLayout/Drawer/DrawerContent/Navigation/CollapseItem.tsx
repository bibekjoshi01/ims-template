// material-ui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { MenuItem } from '@/menu-items/types';
import { useTheme } from '@mui/material';

export default function CollapseItem({
  item,
  level,
  handleToggleCollapse,
  openCollapse
}: {
  item: MenuItem;
  level: number;
  handleToggleCollapse: (id: string) => void;
  openCollapse: Record<string, boolean>;
}) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const theme = useTheme();
  const Icon = item.icon;
  const itemIcon = Icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : null;

  const selectedColor = openCollapse?.[item.id] ? 'primary.main' : 'inherit';
  const bgColor = theme.palette.mode == 'dark' ? 'action.hover' : 'primary.lighter';
  return (
    <ListItemButton
      disabled={item?.disabled || false}
      onClick={() => {
        handleToggleCollapse(item.id);
        if (!drawerOpen) handlerDrawerOpen(true);
      }}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 0,
        pr: drawerOpen ? 2 : 0,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        justifyContent: drawerOpen ? 'initial' : 'center',
        '&:hover': {
          backgroundColor: bgColor
        }
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: drawerOpen ? 28 : 0,
            justifyContent: drawerOpen ? 'flex-start' : 'center',
            color: selectedColor
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {drawerOpen && (
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{
                color: selectedColor
              }}
            >
              {item.title}
            </Typography>
          }
        />
      )}
      {drawerOpen &&
        (openCollapse?.[item.id] ? (
          <KeyboardArrowUpIcon sx={{ color: selectedColor }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ color: selectedColor }} />
        ))}
    </ListItemButton>
  );
}
