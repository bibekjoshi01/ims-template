import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// project import
import { useGetMenuMaster } from '@/api/menu';
import { useMenuSearch } from '@/contexts/search-context';
import menuItems from '@/menu-items';
import { MenuItem } from '@/menu-items/types';
import NavGroup from './NavGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const { searchTerm } = useMenuSearch();

  const isSearching = !!searchTerm.trim();

  // Filter groups here before rendering
  const filteredGroups = menuItems?.items.map((group) => searchMenu(group, searchTerm)).filter((group): group is MenuItem => !!group);

  if (filteredGroups.length === 0) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 2 }}>
        No Results Found!
      </Typography>
    );
  }

  const navGroups = filteredGroups?.map((item, index) => {
    switch (item.type) {
      case 'group':
        return (
          <Box key={item.id}>
            <NavGroup item={item} isSearching={isSearching} />
            {!drawerOpen && index < filteredGroups.length - 1 && <Divider sx={{ my: 1, mx: 1.5 }} />}
          </Box>
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}

/**
 * Recursive search preserving hierarchy
 */
export function searchMenu(item: MenuItem, searchTerm: string): MenuItem | null {
  const match = item?.title.toLowerCase().includes(searchTerm.toLowerCase());

  if (item.children) {
    const matchedChildren = item?.children.map((child) => searchMenu(child, searchTerm)).filter(Boolean) as MenuItem[];

    if (match || matchedChildren.length > 0) {
      return {
        ...item,
        children: matchedChildren
      };
    }
  }

  if (match) {
    return { ...item };
  }

  return null;
}
