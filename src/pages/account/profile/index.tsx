import { useState } from 'react';

// material-ui imports
import { Grid } from '@mui/material';

// components
import TABS from '@/components/CustomTab';
import MainCard from '@/components/cards/MainCard';

// project imports
import { TabItem } from '@/menu-items/types';
import { TabItems } from '../config';
import ProfileTab from './profileTab';

export default function Personal() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: any): void => {
    setValue(newValue);
  };

  const updatedTabItems: TabItem[] = TabItems?.map((tab) => (tab?.id === 'profile' ? { ...tab, tabPanel: ProfileTab } : tab));

  return (
    <Grid container spacing={3}>
      <Grid item sx={{ width: '100%' }}>
        <MainCard sx={{ marginTop: 1 }}>
          <TABS tabItems={updatedTabItems} value={value} handleChange={handleChange} />
        </MainCard>
      </Grid>
    </Grid>
  );
}
