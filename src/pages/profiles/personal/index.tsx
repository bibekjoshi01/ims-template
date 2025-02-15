// assets
import { LockOutlined, PersonOutline, SettingsOutlined } from '@mui/icons-material';

// tabs
import MainCard from '@/components/MainCard';
import { Grid } from '@mui/material';

import TABS from '@/components/CustomTab';
import { TabItem } from '@/menu-items/types';
import { useState } from 'react';
import PersonalTab from './personalTab';

const TabItems: TabItem[] = [
  {
    id: 'personal',
    title: 'Personal',
    icon: PersonOutline,
    url: '/profiles/account/personal',
    tabPanel: PersonalTab
  },
  {
    id: 'change-password',
    title: 'Change Password',
    icon: LockOutlined,
    url: '/profiles/account/change-password'
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: SettingsOutlined,
    url: '/profiles/account/settings'
  }
];

export default function Personal() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any): void => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sx={{ width: '100%' }}>
          <MainCard sx={{ marginTop: 1 }}>
            <TABS tabItems={TabItems} value={value} handleChange={handleChange} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
