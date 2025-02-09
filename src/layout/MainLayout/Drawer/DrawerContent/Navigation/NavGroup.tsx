import { useState } from 'react';

// material-ui
import { Box, Collapse, List, Typography } from '@mui/material';

// project import
import { useGetMenuMaster } from '@/api/menu';
import { MenuItem } from '@/menu-items/types';
import CollapseItem from './CollapseItem';
import NavItem from './NavItem';

export default function NavGroup({ item }: { item: MenuItem }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;

  const [openCollapse, setOpenCollapse] = useState<Record<string, boolean>>({});

  // Function to toggle collapse
  const handleToggleCollapse = (id: string) => {
    setOpenCollapse((prev) => {
      const isAlreadyOpen = prev[id];

      const newState = { ...prev };
      // If the collapse is already open, close it; otherwise, open it and close others
      for (const key in newState) {
        newState[key] = false;
      }
      newState[id] = !newState[id];
      return {
        ...newState,
        [id]: !isAlreadyOpen
      };
    });
  };

  const navCollapse = item.children?.map((menuItem: MenuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Box key={menuItem.id}>
            {/* Parent Collapse Item */}
            <CollapseItem
              key={menuItem.id}
              item={menuItem}
              level={1}
              handleToggleCollapse={handleToggleCollapse}
              openCollapse={openCollapse}
            />
            {/* Collapsible Children */}
            <Collapse in={openCollapse[menuItem.id]} timeout="auto" unmountOnExit>
              {menuItem?.children?.map((childItem) => <NavItem key={childItem.id} item={childItem} level={2} />)}
            </Collapse>
          </Box>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}
