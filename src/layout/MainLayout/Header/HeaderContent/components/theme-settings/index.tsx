import { useState } from 'react';

// Mui imports
import { Box, Drawer, IconButton, Typography, useTheme } from '@mui/material';

import { SettingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { FormatColorFillOutlined, StyleOutlined } from '@mui/icons-material';

// Project imports
import TABS from '@/components/CustomTab';
import { TabItem } from '@/menu-items/types';
import ColorsTab from './ColorsTab';
import ThemesTab from './ThemesTab';
import { fontSize } from '@mui/system';

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
          <SettingOutlined className="rotateIcon" />
        </IconButton>
      </Box>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[16]
          }
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            backgroundColor: 'primary.main'
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 2.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" fontWeight={600} color={'primary.contrastText'}>
              Theme Customization
            </Typography>
            <IconButton
              onClick={toggleDrawer}
              size="small"
              sx={{
                borderRadius: '50%',
                color: 'common.white',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'common.white',
                  transition: 'all 0.1s ease-in-out'
                }
              }}
            >
              <CloseCircleOutlined
                style={{
                  fontSize: '1.2rem'
                }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ p: 2 }}>
          <TABS variant="fullWidth" handleChange={handleTabChange} value={activeTab} tabItems={TabItems} />
        </Box>
      </Drawer>
    </>
  );
}
