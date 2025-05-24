import { useState } from 'react';

// Mui imports
import { Box, Drawer, IconButton, Typography, useTheme } from '@mui/material';

import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { FormatColorFillOutlined, StyleOutlined } from '@mui/icons-material';

// Project imports
import TABS from '@/components/CustomTab';
import { TabItem } from '@/menu-items/types';
import ColorsTab from './ColorsTab';
import ThemesTab from './ThemesTab';

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
  const toggleDrawer = () => setOpenDrawer((prev) => !prev);

  return (
    <>
      {/* Settings Trigger Button */}
      <Box sx={{ flexShrink: 0, ml: 0.5 }}>
        <IconButton
          onClick={toggleDrawer}
          title="Theme Settings"
          sx={{
            bgcolor: openDrawer ? 'action.hover' : 'transparent',
            mr: 0.25
          }}
        >
          <SettingOutlined />
        </IconButton>
      </Box>
      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            maxWidth: 340,
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[16]
          }
        }}
      >
        {/* Drawer Header */}
        {/* FIXME - this part is not visible sometimes  */}
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
          <IconButton onClick={toggleDrawer} size="small">
            <CloseOutlined />
          </IconButton>
        </Box>

        {/* Tabs */}
        <TABS variant="fullWidth" handleChange={handleTabChange} value={activeTab} tabItems={TabItems} />
      </Drawer>
    </>
  );
}
