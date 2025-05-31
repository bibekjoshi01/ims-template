import { Avatar, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { InfoField } from '@/components/detail-section';

// project imports
import MainCard from '@/components/cards/MainCard';
import { useGetProfile } from '../hooks/useGetProfile';
import DynamicInfoSection from '@/components/detail-section';
import { viewProfileConfig } from './profile.config';
import { DynamicInfoSectionProps } from '@/components/detail-section/types';

export default function ProfileView({ setEdit }: { setEdit: () => void }) {
  const { profileData: profile, isLoading } = useGetProfile();

  if (isLoading) return <CircularProgress />;
  if (!profile) return <Typography variant="h6">Profile not found</Typography>;

  const DynamicInfoSectionProps: DynamicInfoSectionProps = {
    ...viewProfileConfig,
    data: profile
  };

  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={12} md={6}>
        <MainCard divider title="Personal Information">
          <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
            <Avatar
              src={typeof profile?.photo === 'string' ? profile.photo : undefined}
              alt="Profile"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <InfoField label="Roles" value={profile.roles} />
          </Box>
          <DynamicInfoSection {...DynamicInfoSectionProps} />
          <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setEdit()} variant="outlined" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
