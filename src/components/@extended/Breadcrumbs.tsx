import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@/components/cards/MainCard';
import type { MenuItem, MenuItems } from '@/menu-items/types';

interface BreadcrumbsProps {
  navigation?: MenuItems;
  title?: boolean;
  [key: string]: unknown;
}

export default function Breadcrumbs({ navigation, title, ...others }: BreadcrumbsProps) {
  const location = useLocation();
  const [main, setMain] = useState<MenuItem | undefined>();
  const [item, setItem] = useState<MenuItem | undefined>();

  // set active item state
  const getCollapse = (menu: MenuItem) => {
    if (menu.children) {
      menu.children.filter((collapse: MenuItem) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // only used for component demo breadcrumbs
  const pathname = location.pathname === '/breadcrumbs' ? '/dashboard/analytics' : location.pathname;

  let mainContent;
  let itemContent;
  let breadcrumbContent: ReactNode = <Typography />;

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography
        component={Link}
        to={pathname}
        variant="h6"
        sx={{
          color: 'text.secondary',
          textDecoration: 'none'
        }}
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          color: 'text.primary'
        }}
      >
        {item.title}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent', boxShadow: 'none' }} {...others} content={false}>
          <Stack spacing={1} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Grid>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography
                  component={Link}
                  to="/"
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none'
                  }}
                >
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid>
                <Typography variant="h2">{item.title}</Typography>
              </Grid>
            )}
          </Stack>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}
