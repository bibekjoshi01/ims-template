import { useState } from 'react';

// Mui imports
import { Drawer, IconButton, Box, useTheme, Typography } from '@mui/material';

import { SettingsOutlined, FormatColorFillOutlined, StyleOutlined } from '@mui/icons-material';

// Project imports
import { TabItem } from '@/menu-items/types';
import TABS from '@/components/CustomTab';
import ThemesTab from './ThemesTab';
import ColorsTab from './ColorsTab';

const TabItems: TabItem[] = [
  {
    id: 'themes',
    title: 'Themes',
    icon: StyleOutlined,
    tabPanel: ThemesTab
  },
  {
    id: 'colors',
    title: 'Colors',
    icon: FormatColorFillOutlined,
    tabPanel: ColorsTab
  }
];

export default function ThemeSettings() {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const toggleDrawer = (open: boolean) => () => setOpenDrawer(open);

  return (
    <>
      {/* Settings Trigger Button */}
      <IconButton
        onClick={toggleDrawer(true)}
        title="Theme Settings"
        sx={{
          bgcolor: openDrawer ? 'secondary.hover' : 'transparent',
          mr: 0.25
        }}
      >
        <SettingsOutlined sx={{ color: 'text.primary' }} />
      </IconButton>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 340,
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[16]
          }
        }}
      >
        {/* Drawer Header */}
        {/* FIXME - this part is not visible, z-index not working  */}
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Theme Customization
          </Typography>
          <IconButton onClick={toggleDrawer(false)} size="small">
            <SettingsOutlined fontSize="small" />
          </IconButton>
        </Box>

        {/* Tabs */}
        <TABS variant="fullWidth" handleChange={handleTabChange} value={activeTab} tabItems={TabItems} />
      </Drawer>
    </>
  );
}
