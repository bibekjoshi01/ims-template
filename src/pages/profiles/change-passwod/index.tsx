import { Grid } from '@mui/material';
import { useState } from 'react';

// assets
import { LockOutlined, PersonOutline, SettingsOutlined } from '@mui/icons-material';

// tabs
import TABS from '@/components/CustomTab';
import MainCard from '@/components/MainCard';
import { TabItem } from '@/menu-items/types';
import ChangePasswordTab from './changePasswordTab';

const TabItems: TabItem[] = [
  {
    id: 'personal',
    title: 'Personal',
    icon: PersonOutline,
    url: '/profiles/account/personal'
  },
  {
    id: 'change-password',
    title: 'Change Password',
    icon: LockOutlined,
    url: '/profiles/account/change-password',
    tabPanel: ChangePasswordTab
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: SettingsOutlined,
    url: '/profiles/account/settings'
  }
];

export default function ChangePassword() {
  const [value, setValue] = useState(1);

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
