import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { TabItem } from '@/menu-items/types';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

interface TabsPropsTypes {
  tabItems: TabItem[];
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: any) => void;
  variant?: 'fullWidth' | 'standard' | 'scrollable' | undefined;
}

export default function TABS({ tabItems, value, handleChange, variant }: TabsPropsTypes) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (url: string | undefined | null) => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant={variant} value={value} onChange={handleChange} aria-label="profile tabs">
          {tabItems.map((item, index) => (
            <Tab
              key={item.id}
              onClick={() => handleClick(item?.url)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'capitalize',
                gap: '5px'
              }}
              icon={item?.icon ? <item.icon style={{ height: '1.2rem', marginBottom: 0 }} /> : undefined}
              label={item.title}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      {tabItems.map((item, index) => (
        <TabPanel key={item.id + item.title} value={value} index={index} dir={theme.direction}>
          {item.tabPanel && <item.tabPanel />}
        </TabPanel>
      ))}
    </>
  );
}
